import logger from "../utils/logger.js";

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {

            logger.warn({
                method: req.method,
                url: req.originalUrl,
                message: "Forbidden: Access denied",
            })

            return res.status(403).json({
                success: false,
                message: "Forbidden: Access denied"
            });
        }
        next();
    };
};