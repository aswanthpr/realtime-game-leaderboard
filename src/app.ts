import express ,{type Application,Response, Request} from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import compression from "compression";
import leaderboard from './routers/leaderboard.routes'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { connectDb ,initRedis} from './configs';

import { httpCorsConfig } from './middlewares/index';

const app:Application = express();
export const  redisClient  = initRedis();
connectDb();

app.set("trust proxy", 1);
app.use(cors(httpCorsConfig));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/", (_req:Request, res:Response) => {
  res.send("✅ Leaderboard API is running");
});



app.use("/leaderboard", leaderboard );
app.use(notFoundHandler)
app.use(errorHandler);

export default app;
   