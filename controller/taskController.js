import { getTasks, getTasksById , createTask, updateTask, deleteTask } from "../services/taskService.js"
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

export const getTaskController = async (req, res, next) => {
    try {
        const {
            status,
            date,
            order,
            sortBy,
            search,
            page,
            limit } = req.query;
        const userId = req.user.id;

        const tasks = await getTasks({
            userId,
            status,
            date,
            order,
            sortBy,
            search,
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        });

        return res.status(200).json({
            success: true,
            ...tasks
        })
    } catch (error) {
        next(error)
    }
}

export const getTasksByIdController = async (req,res,next) => {
    try {
        const userId = req.user.id;
        const taskId = Number(req.params.id);
        const taskdata = await getTasksById(userId,taskId);

        if(taskdata === null){
            return next(new AppError("This Task is not created by you", 403));
        }
        
        return res.status(200).json({
            success: true,
            taskdata
        })
    
    } catch (error) {
        next(error)
    }
}

export const createTaskController = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const task = await createTask({
            title,
            content,
            userId: req.user.id
        })

        if (!title || !content) {
            return next(new AppError("Title and content are required", 400));
        }

        logger.info(`Task created by user ${req.user.id}`);

        return res.status(201).json({
            success: true,
            message: "Task is Created",
            task
        })

    } catch (error) {
        next(error)
    }
}

export const updateTaskController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const { title, content } = req.body;

        const task = await updateTask(
            id,
            userId,
            {
                title,
                content
            }
        );

        if (task.count === 0) {
            return next(new AppError("Task not found or not updated", 404));
        }

        logger.info(`Task ${id} updated by user ${req.user.id}`);

        return res.status(200).json({
            success: true,
            message: "Task Updated",
            task
        });

    } catch (error) {
        next(error)
    }
}

export const deleteTaskController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const task = await deleteTask(id, userId);

        if (task.count === 0) {
            return next(new AppError("Task not found or already deleted", 404));
        }

        logger.info(`Task ${id} deleted by user ${req.user.id}`);

        return res.status(200).json({
            success: true,
            message: "Task Deleted",
            task
        });

    } catch (error) {
        next(error)
    }
}