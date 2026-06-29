import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { requestLogger } from "./middleware/loggerMiddleware.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.use(errorMiddleware);

if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT, () => {
        logger.info(`server is running on ${process.env.PORT}`);
    });
}

export default app;