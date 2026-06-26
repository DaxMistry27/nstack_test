import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            logger.warn({
                method: req.method,
                url: req.originalUrl,
                message: "Unauthorized",
            });
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        next(error)
    }
};