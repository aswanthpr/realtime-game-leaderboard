import express ,{type Application,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import compression from "compression";
import leaderboard from './routers/leaderboard.routes'
import { errorHandler } from './middlewares/error.middleware';
import { connectDb ,initRedis} from './configs';
import rateLimit from 'express-rate-limit';
import { httpCorsConfig } from './middlewares/index';

const app:Application = express();
export const  redisClient  = initRedis();
connectDb();

app.use(cors(httpCorsConfig));
app.use(compression());
app.use(rateLimit())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/health", (_req, res:Response) => {
  res.send("API health is perfect...");
});


app.use("/leaderboard", leaderboard );
app.use(errorHandler);

export default app;
   