import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!config.tokenSecret) {
    return res.status(500).json({ error: "Token secret is missing or undefined" });
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.tokenSecret, (error: any, user: any) => {
      if (error) {
        console.log("JWT verification error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
      req.user = user as { username: string; role: string };
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized: No Bearer Token" });
  }
};
