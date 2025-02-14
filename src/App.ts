import express from "express";

import { connectDB } from "./config/database";
import dotenv from "dotenv";
// import { User } from "./entities/User";
import UserRoute from "./routes/UserRoute";

dotenv.config();

const app = express();

const port = 3001;

app.use(express.json());
connectDB();

app.use("/auth", UserRoute);
app.use("/send", UserRoute);

app.listen(port, async () => {
  console.log("App is running in", port);
});
