import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

interface CustomRequest extends Request {
    userId?: string
}

export default function userMiddleware(req: CustomRequest, res: Response, next: NextFunction): void{
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            res.status(404).json({error: "Token not found"})
            return;
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as {userId: string}
        if(!decodedToken){
            res.status(404).json({error: "Access Unauthorized"})
            return;
        }
        req.userId = decodedToken.userId;
        next();
    } catch(err){
        console.log(err);
        res.status(400).json({error: err});
        return;
    }
}