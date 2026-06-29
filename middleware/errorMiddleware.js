import logger from "../utils/logger.js";

export const errorMiddleware = (err, req, res, _next) => {

    logger.error({
        method: req.method,
        url: req.originalUrl,
        message: err.message,
        stack: err.stack
    });

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};