import express from "express";
import multer from "multer";
import { Router, Request, Response } from "express";
import AppDataSource from "../datasource";
import User from "../entities/User";
import { UserController } from "../controllers/UserController";
import authenticateUser from "../middleware/JWTAuth";

const router = Router();

// const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", UserController.register);

router.get("/getUser", authenticateUser, UserController.getUser);
// router.post("/upload", upload.single("resume"), AwsController.UploadToAws);

router.post("/login", UserController.login);

export default router;
