import express from "express";
import { connectToDatabase } from "./utils/database";
import logger from "./utils/logger";
import shutdownGracefully from "./utils/shutdownGracefully";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import deserializeUser from "./middleware/deserializeUser";
import videoRoute from "./modules/videos/video.route";
import dotenv from "dotenv";

const app = express();

// Load environment variables from .env file
dotenv.config();

console.log(process.env.JWT_SECRET);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(deserializeUser);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);



const server = app.listen(process.env.PORT, async () => {
  await connectToDatabase();
  logger.info(`Server started on port ${process.env.PORT}`);
});

// server shutdown
shutdownGracefully(server, ["SIGINT", "SIGTERM"]);
