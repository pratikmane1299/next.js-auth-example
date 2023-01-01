import * as mongoose from 'mongoose';

export function connectToDb() {
	return mongoose.connect(process.env.DB_URL || '');
}

export default mongoose;
