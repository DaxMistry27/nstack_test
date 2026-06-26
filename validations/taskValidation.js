import Joi from "joi";

export const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(5).required()
});