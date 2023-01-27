import "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { connectToDb } from "./db";
import { generateTokens, RefreshTokenData } from "./utils/jwt";
import { isAuthenticated } from "./middlewares/auth";

import User from "./models/user";
import { verify } from "jsonwebtoken";
import { getGithubEmail, getGithubUser, getUserRepos } from "./utils/github";
import { getAvatarUrl } from "./utils/avatar";
import { generateUsername } from "./utils/utils";

const PORT = process.env.PORT || "4242";

export default async function main() {
  const app = express();

  app.use(cors());
  app.use(morgan("dev", { immediate: true }));
  app.use(helmet());
  app.use(express.json());

  try {
    await connectToDb();
    console.log("connected to db :)");
  } catch (error) {
    console.log("can't connect to db - ", error);
  }

  app.get<{}, string>("/", (req: Request, res: Response) => {
    res.send("hello world !!!");
  });

  app.post<{
    email: string;
    password: string;
  }>("/api/v1/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // check if user exits...
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

		const avatarUrl = getAvatarUrl(email);
		const username = generateUsername(email.split("@")[0]);

    const user = await User.create({
      email,
			username,
      password,
      avatarUrl,
    });

    const tokens = await generateTokens(user);

    return res.json({ succes: true, ...tokens });
  });

  app.post<{
    email: string;
    password: string;
  }>("/api/v1/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({
          error: true,
          message: "Email is required",
        });
      }

      if (!password) {
        res.status(400).json({
          error: true,
          message: "Password is required",
        });
      }

      const user = await User.findOne({
        email,
      });

      // check if user exists, if not return...
      if (!user)
        return res
          .status(400)
          .json({
            success: false,
            message: "Email or password doesn't exists",
          });

      // compare passwords...
      const match = await user.comparePasswords(String(password).trim());

      // if passowrds don't match return...
      if (!match) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Email or password doesn't exists",
          });
      }

      const tokens = await generateTokens(user);

      res.json({ success: true, ...tokens });
    } catch (error) {
      console.log("error - ", error);
    }
  });

  // route to get logged in user...
  app.get<{}>(
    "/api/v1/me",
    isAuthenticated,
    async (req: Request, res: Response) => {
      try {
        const userId = req?.userId || "";

        if (!userId) {
          return res.status(404).json({
            message: "User not found...",
          });
        }

        const user = await User.findById(
          userId,
          "-password -accessToken -refreshToken -__v"
        );

        res.json({
          success: true,
          user,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  );

  app.get("/api/v1/refreshTokens", async (req: Request, res: Response) => {
    const refreshToken = req?.headers["refreshtoken"];

    if (typeof refreshToken !== "string") {
      return res.status(401).json({ message: "Unathorized" });
    }

    try {
      const data = <RefreshTokenData>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "")
      );

      const user = await User.findById(data?.id);

      // check if user exists...
      if (!user) {
        return res.status(401).json({ message: "Unathorized" });
      }

      const tokens = await generateTokens(user);

      return res.json({ success: true, tokens });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Unathorized" });
    }
  });

  app.post<
    {},
    {},
    {
      providerAccountId: string;
      accessToken: string;
      tokenType: string;
      scope: string;
    }
  >("/api/v1/auth/github", async function (req: Request, res: Response) {
    const { providerAccountId, accessToken, tokenType, scope } = req.body;

		const emails = await getGithubEmail(accessToken);

		const primaryEmail = emails?.find(
      (email: {
        email: string;
        verified: boolean;
        primary: boolean;
        visibility: string;
      }) => email?.primary && email?.verified
    );

		const githubUser = await getGithubUser(accessToken);

		let user = await User.findOne({
			email: primaryEmail?.email
		});

		const transformedGithubUser = {
			enabled: true,
			id: githubUser.id,
			username: githubUser?.login,
			link: githubUser?.html_url,
			accessToken,
		}

		if (user) {
			user.github = transformedGithubUser;
			await user.save();
			
		} else {
			user = await User.create({
				username: githubUser?.login,
				email: primaryEmail?.email,
				avatarUrl: githubUser?.avatar_url,
				verified: true,
				github: transformedGithubUser,
			});
		}

		const tokens = await generateTokens(user);

    return res.json({
      success: true,
      tokens,
    });
  });

	app.post(
    "/api/v1/auth/logout",
    isAuthenticated,
    async (req: Request, res: Response) => {
      const userId = req.userId;

			await User.findByIdAndUpdate(userId, {
        accessToken: null,
        refreshToken: null,
      });

			res.json({ success: true });
    }
  );

	app.post<
    {},
    {},
    {
      firstname: string;
      lastname: string;
      bio: string;
      tags: string[];
      socials: { instagram: string; twitter: string; facebook: string };
    }
  >(
    "/api/v1/save-onboarding",
    isAuthenticated,
    async (req: Request, res: Response) => {
      const userId = req.userId;
      const { firstname, lastname, bio, tags, socials = {} } = req.body;
    
			try {
				await User.findByIdAndUpdate(userId, {
          $set: {
            firstname,
            lastname,
            bio,
            tags,
            socials,
						onboardingDone: true,
          },
        });

				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false });
			}
    }
  );

	app.get<{ username: string }>(
    "/api/v1/github/:username/repos/",
    async (req, res) => {
			const { username } = req.params;
			try {
				const user = await User.findOne({ "github.username": username });
	
				if (!user) {
					return res
						.status(404)
						.json({ success: false, message: "User not found" });
				}
	
				if (user?.github && user?.github?.accessToken) {
					const repos = await getUserRepos(username, user?.github?.accessToken);
	
					return res.json({ success: true, data: { repos } });
				}
	
				return res.json({ success: false, data: { repos: [] } });
			} catch (error) {
				console.log('error - ', error);
			}
		}
  );

  app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}/`)
  );
}
