import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import blogRouter from "./routes/blog";

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
	origin: 'http://localhost:3000'
}))
app.use(morgan('dev'));
app.use(blogRouter);

const port: number =
	process.env.PORT !== undefined ? parseInt(process.env.PORT) : 5000;

app.listen(port, () => {
	console.log(`API runnig on ${port}`);
});
