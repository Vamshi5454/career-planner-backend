import express from "express";
import bcrypt from "bcryptjs";
import { Router, Request, Response } from "express";
import User from "../entities/User";
import AppDataSource from "../datasource";
import logger from "../logs/logger";
import { generateToken } from "../utils/jwt";

const userRepository = AppDataSource.getRepository(User);
export const UserController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      //Creating an instance
      console.log(name);

      const newUser = userRepository.create({
        name,
        email,
        password,
      });

      //Adding instace to the Database
      const saveUser = await userRepository.save(newUser);
      logger.info("useer created");
      res.status(201).json({ message: "User Crated Successfully" });
    } catch (err) {
      res.status(500).json({ message: "User not created", err });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const id = req.userId;

      logger.info("trying to fetch user from getUser");
      if (!id) {
        res.status(404).json({ message: "unauthorized" });
      }
      const user = await userRepository.findOne({ where: { id: id } });

      if (!user) {
        res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json(err);
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({ where: { email } });

      // if (!user || !(await bcrypt.compare(password, user.password))) {
      //   res.status(401).json({ messsage: "Invalid Credentials" });
      //   return;
      // }
      const token = generateToken(user.id);
      res.cookie("jwt", token, {
        httpOnly: true,
        // secure:process.env
        // sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      logger.error(err);
      res.status(500).json(err);
    }
  },
};
