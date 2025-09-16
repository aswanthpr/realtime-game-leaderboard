import express ,{type Application,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import compression from "compression";
import leaderboard from './routers/leaderboard.routes'
import { errorHandler } from './middlewares/error.middleware';
import { connectDb ,initRedis} from './configs';
import rateLimit from 'express-rate-limit';
const app:Application = express();
initRedis();
connectDb();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
  