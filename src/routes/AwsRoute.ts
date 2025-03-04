import express from "express";
import { Router } from "express";
import { AwsController } from "../controllers/AwsController";
import multer from "multer";

const uploadRoute = Router();

const upload = multer({ storage: multer.memoryStorage() });

uploadRoute.post("/upload", upload.single("resume"), AwsController.UploadToAws);

export default uploadRoute;
