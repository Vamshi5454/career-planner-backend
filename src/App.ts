import express from "express";

import { connectDB } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 3000;

app.use(express.json());
connectDB();
app.listen(port, async () => {
  console.log("App is running in", port);
});
