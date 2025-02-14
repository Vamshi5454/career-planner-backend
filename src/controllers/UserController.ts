import express from "express";
import { Router, Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../ormconfig";

export const UserController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      //Creating an instance
      console.log(name);
      const userRepository = AppDataSource.getRepository(User);

      const newUser = userRepository.create({
        name,
        email,
        password,
      });

      //Adding instace to the Database
      const saveUser = await userRepository.save(newUser);

      res.status(201).json({ message: "User Crated Successfully" });
    } catch (err) {
      res.status(500).json({ message: "User not created", err });
    }
  },
};
