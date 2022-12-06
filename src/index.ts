import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if( dotenvResult.error ) {
    throw dotenvResult.error;
}
import cors from 'cors';
import helmet from 'helmet';
import { CommonRoutesConfig } from './helpers/CommonRoutesConfig';
import express, { Application, Request, Response } from 'express';

const PORT: number = parseInt( process.env.PORT as string, 10);
const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('*', (req: Request, res: Response) => {
    res.status(400).json({
        ok: false,
        msg: 'Ohh you are lost, read the API documentation to find your way back home'
    })
});

app.listen( PORT, () => {
    console.log(`Server run on port ${ PORT }`)
});