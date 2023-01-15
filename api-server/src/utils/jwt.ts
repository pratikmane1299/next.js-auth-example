import { Request, Response, NextFunction, RequestHandler } from "express";
import { sign, verify } from "jsonwebtoken";

import User from "../models/user";

export type AccessTokenData = {
	id: string;
}

// type RefreshTokenData = {
// 	id: string;
// }

export const generateTokens = async (
  user: any
): Promise<{ accessToken: string; refreshToken: string }> => {
  // generate new access & refresh tokens...
  const accessToken = sign(
		{ id: user._id, },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: "30mins" }
  );

  const refreshToken = sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET || "",
    { expiresIn: "30d" }
  );

	await User.findByIdAndUpdate(user._id, {
		accessToken,
		refreshToken,
	});

  return { accessToken, refreshToken };
};

