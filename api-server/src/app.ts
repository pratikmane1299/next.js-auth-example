import 'dotenv';
import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { connectToDb } from './db';
import { generateTokens } from "./utils/jwt";
import { isAuthenticated } from './middlewares/auth';

import User from './models/user';

const PORT = process.env.PORT || '4242';

export default async function main() {
	const app = express();

	app.use(cors());
	app.use(morgan('combined'));
	app.use(helmet());
	app.use(express.json());

	try {
		await connectToDb();
		console.log('connected to db :)');
	} catch (error) {
		console.log('can\'t connect to db - ', error);
	}

	app.get<{}, string>('/', (req: Request, res: Response) => {
		res.send('hello world !!!');
	});

	app.post<{
		email: string;
		password: string;
	}>('/api/v1/signup', async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (!email) {
			res.status(400).json({
				success: false,
				message: 'Email is required',
			});
		}

		if (!password) {
			res.status(400).json({
				success: false,
				message: 'Password is required',
			});
		}

		// check if user exits...
		const existingUser = await User.findOne({
			email,
		});

		if (existingUser) {
			return res.status(400).json({
				success: false, message: 'User already exists'
			});
		}

		const user = await User.create({
			email,
			password,
		});

		const tokens = await generateTokens(user);

		return res.json({ succes: true, ...tokens });
	});

	app.post<{
		email: string;
		password: string;
	}>('/api/v1/login', async (req: Request, res: Response) => {
		try {
			
			const { email, password } = req.body;
	
			if (!email) {
				res.status(400).json({
					error: true,
					message: 'Email is required',
				});
			}
	
			if (!password) {
				res.status(400).json({
					error: true,
					message: 'Password is required',
				});
			}
	
			const user = await User.findOne({
				email,
			});
	
			// check if user exists, if not return...
			if (!user) return res.status(400).json({success: false, message: 'Email or password doesn\'t exists'});
	
			// compare passwords...
			const match = await user.comparePasswords(String(password).trim());			
	
			// if passowrds don't match return...
			if (!match) {
				return res.status(400).json({success: false, message: 'Email or password doesn\'t exists'});
			}

			const tokens = await generateTokens(user);

			res.json({ success: true, ...tokens });
		} catch (error) {
			console.log('error - ', error);
		}
	});

	// route to get logged in user...
	app.get<{}>(
    "/api/v1/me",
    isAuthenticated,
    async (req: Request, res: Response) => {
      try {
				const userId = req?.userId || '';

				if (!userId) {
					return res.status(404).json({
						message: "User not found...",
					});
				}

				const user = await User.findById(userId, "-password -accessToken -refreshToken -__v");

				res.json({
					success: true,
					user,
				});
			} catch (error) {
				console.log('error', error);
			}
    }
  );

	app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}/`))
}
