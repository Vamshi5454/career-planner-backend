import express from "express";

import { connectDB } from "./config/database";
import dotenv from "dotenv";
// import { User } from "./entities/User";
import UserRoute from "./routes/UserRoute";
import uploadRoute from "./routes/AwsRoute";
import cors from "cors";
import logger from "./logs/logger";
// dotenv.config();

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

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
