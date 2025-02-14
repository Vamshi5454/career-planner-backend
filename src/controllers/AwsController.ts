import { Request, Response } from "express";

import AWS from "aws-sdk";

import dotenv from "dotenv";
import multer, { Multer } from "multer";

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
      if (!file) {
        res.status(400).json({ message: " No file Uploaded" });
        return;
      }

      const params = {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: `resumes/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      console.log(process.env.AWS_S3_BUCKET);

      const uploadResult = await s3.upload(params).promise();

      res.json({
        message: "Resume Upload Successfully",
        url: uploadResult.Location,
      });
    } catch (error) {
      res.status(500).json({ message: "File upload error", error });
    }
  },
};
