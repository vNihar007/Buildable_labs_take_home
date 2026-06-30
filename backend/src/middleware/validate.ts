import { AnyZodObject } from "zod/v3";
import { Request, Response, NextFunction } from "express";

export const validate =(schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body) ;
        if (!result.success){
            return res.status(400).json({
                success: false,
                error: result.error.message
            })
        }
        req.body = result.data;
        next();
    }
}
