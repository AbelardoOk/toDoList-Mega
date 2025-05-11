import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { TokenPayload } from "../interface/middleware";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    usuario?: TokenPayload;
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido ou expirado" });
    return;
  }
}
