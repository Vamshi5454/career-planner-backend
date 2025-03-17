import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(err);
  }
};
export default authenticateUser;
