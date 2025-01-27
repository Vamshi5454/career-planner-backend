import express from "express";
import { Router, Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

const app = express();
const router = Router();

// app.get()

router.post("/register", async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    // res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Error in fetching the users" });
  }
});
export default router;
