import logger from "../utils/logger.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {

            logger.error({
                method: req.method,
                url: req.originalUrl,
                message: error.message,
                stack: error.stack
            });

            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        next();
    };
};