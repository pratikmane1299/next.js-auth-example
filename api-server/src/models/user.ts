import bcrypt from 'bcryptjs';

import mongoose from "../db";

interface IUser {
	email: string;
	password: string;
	avatarUrl?: string;
	verified?: boolean;
	refreshToken?: string;
	accessToken?: string;
};

interface IUserMethods {
  generateHash: () => Promise<string>;
	comparePasswords: (password: string) => Promise<boolean>;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	avatarUrl: { type: String, required: false },
	verified: { type: Boolean, default: false },
	accessToken: { type: String, required: false },
	refreshToken: { type: String, required: false },
});

userSchema.pre('save', async function () {
	this.password = await this.generateHash()
});

userSchema.method('generateHash', async function () {
	const saltRounds = 10;
	return bcrypt.hash(this.password, saltRounds);
});

userSchema.method('comparePasswords', function(password: string) {
	return bcrypt.compare(password, this.password)
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;