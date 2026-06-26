import express from "express";
import { getTaskController, createTaskController, updateTaskController, deleteTaskController } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/roleBaseMiddleware.js";
import { validate } from "../middleware/validatorMiddleware.js";
import { taskSchema } from "../validations/taskValidation.js";

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, authorize("USER", "ADMIN"), getTaskController);
taskRouter.post("/", authMiddleware, authorize("USER", "ADMIN"), validate(taskSchema), createTaskController);
taskRouter.put("/:id", authMiddleware, authorize("USER", "ADMIN"), validate(taskSchema), updateTaskController);
taskRouter.delete("/:id", authMiddleware, authorize("USER", "ADMIN"), deleteTaskController);

export default taskRouter;
