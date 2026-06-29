import Joi from "joi";

export const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(5).required(),
    status: Joi.string().valid("PENDING", "COMPLETED").required(),

    createdAt: Joi.forbidden(),
    updatedAt: Joi.forbidden()
});