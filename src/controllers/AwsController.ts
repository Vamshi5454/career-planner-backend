import { Request, Response } from "express";

import AWS from "aws-sdk";

import dotenv from "dotenv";
import multer, { Multer } from "multer";
import { AppDataSource } from "../ormconfig";
import { Resume } from "../entities/Resume";
import { User } from "../entities/User";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

export const AwsController = {
  UploadToAws: async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file as Express.Multer.File;
      const { userId } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!userId) {
        res.status(400).json("userId required");
      }
      if (!file) {
        res.status(400).json({ message: " No file Uploaded" });
        return;
      }
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const s3key = `resumes/${Date.now()}-${file.originalname}`;

      const params = {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: s3key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      console.log(process.env.AWS_S3_BUCKET);

      const uploadResult = await s3.upload(params).promise();

      const resumeRepository = AppDataSource.getRepository(Resume);
      const newResume = resumeRepository.create({
        user,
        s3key,
      });
      await resumeRepository.save(newResume);

      res.json({
        message: "Resume Upload Successfully",
        url: uploadResult.Location,
      });
    } catch (error) {
      res.status(500).json({ message: "File upload error", error });
    }
  },
};
