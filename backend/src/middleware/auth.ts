import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request{
    user?:{id:number;role:string};
}

export const verifyToken = (  
     req: AuthRequest,
  res: Response,
  next: NextFunction
):void =>{
      try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    req.user = decoded;
    
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

