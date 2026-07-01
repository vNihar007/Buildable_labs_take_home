import type { Request,Response ,NextFunction } from "express";
import ApiError from "../utils/ApiErorr.js";
import logger from "../config/logger.js";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
            },
        });
    }

    logger.error(err);

    return res.status(500).json({
        success: false,
        error: {
            message: "Internal Server Error",
        },
    });
}