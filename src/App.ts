import express from "express";

import { connectDB } from "./config/database";
import dotenv from "dotenv";
// import { User } from "./entities/User";
import UserRoute from "./routes/UserRoute";
import uploadRoute from "./routes/AwsRoute";
import cors from "cors";
import logger from "./logs/logger";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = 3001;

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/user", UserRoute);

app.use("/resume", uploadRoute);

app.listen(port, async () => {
  console.log("App is running in", port);
});

// for gitdesktop

app.get("/test", (req, res) => {
  logger.info("Testiing the route");
  res.send("Logging is working");
});
logger.info("Testing info log - This should create combined.log");
try {
  throw new Error("To test the logger");
} catch (err) {
  logger.error("error occured", err);
}
