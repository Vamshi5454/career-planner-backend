import { Request, Response } from "express";

import AWS from "aws-sdk";

import dotenv from "dotenv";
import multer, { Multer } from "multer";
import AppDataSource from "../datasource";
import Resume from "../entities/Resume";
import User from "../entities/User";
import logger from "../logs/logger";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

const userRepository = AppDataSource.getRepository(User);
const resumeRepository = AppDataSource.getRepository(Resume);

export const AwsController = {
  UploadToAws: async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file as Express.Multer.File;
      const { userId } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });
      if (!userId) {
        res.status(400).json("userId required");
      }
      if (!file) {
        res.status(400).json({ message: " No file Uploaded" });
        return;
      }
      if (!user) {
        logger.error("User not found");
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
  getFromS3: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        res.status(404).json("UserId required");
        return;
      }

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        res.status(404).json("User not found");
        return;
      }

      const resume = await resumeRepository.findOne({
        where: { user: { id: userId } },
      });

      // const s3key = resumeRepository.findOne({ where: {} });

      if (!resume) {
        res.status(404).json("Resume Not Found");
        return;
      }

      if (!resume.s3key) {
        res.status(500).json({ message: "S3 key is missing for this resume" });
        return;
      }

      const generateSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: resume.s3key,
        Expires: 300,
      });

      res.json({
        message: "Presigned Url generated successfully",
        downloadUrl: generateSignedUrl,
      });
    } catch (err) {
      console.error("Error fetching resume:", err);
      res.status(400).json({ message: "error while creating url", err });
    }

    //
  },
  getAll: async (req: Request, res: Response) => {
    // console.log("called for all");
    const generatedUrl = async (s3key: string) => {
      return s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: s3key,
        Expires: 300,
      });
    };

    try {
      const { userId } = req.body;
      const resumes = await resumeRepository.find({
        where: { user: { id: userId } },
      });

      const urls = await Promise.all(
        resumes.map(async (item, index) => await generatedUrl(item.s3key))
      );

      console.log(urls);
      // console.log(resume);
      res.status(200).json(urls);
    } catch (err) {
      res.status(200);
    }
  },
};
