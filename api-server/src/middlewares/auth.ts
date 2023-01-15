import { NextFunction, RequestHandler, Response, Request } from "express";
import { verify } from "jsonwebtoken";

import { AccessTokenData } from "../utils/jwt";

import User from "../models/user";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["accesstoken"];
  // const refreshToken = req.headers["refreshToken"];`

	// check if accessToken exsits ...
  if (typeof accessToken !== "string") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // check if token is valid...
  let data;
  try {
    data = <AccessTokenData>(
      verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "")
    );

    const user = await User.findById(data?.id);

		// check if user exsits ...
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.userId = data.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
