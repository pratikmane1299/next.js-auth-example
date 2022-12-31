import 'dotenv';
import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const PORT = process.env.PORT || '4242';

export default function main() {
	const app = express();

	app.use(cors());
	app.use(morgan('combined'));
	app.use(helmet());

	app.get<{}, string>('/', (req: Request, res: Response) => {
		res.send('hello world !!!');
	});

	app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}/`))
}
