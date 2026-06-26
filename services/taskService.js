import prisma from "../config/db.js"

export const getTasks = async ({ userId, status, date, order = "asc", sortBy = "createdAt", search, page = 1, limit = 10 }) => {

    const where = {
        userId
    }
    let orderBy;

    if (status) {
        where.status = status
    }

    if (date) {
        where.createdAt = {
            gte: new Date(date)
        }
    }

    if (order && sortBy) {
        orderBy = {
            [sortBy]: order
        }
    }

    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                content: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        ]
    }

    const totalItems = await prisma.task.count({
        where
    })

    const tasks = await prisma.task.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: Number(limit),
    });

    return {
        tasks,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        limit
    }
}

export const getTasksById = async (userId, id) => {
    return await prisma.task.findUnique({
        where: {
            id,
            userId
        }
    })
}

export const createTask = async (task) => {
    return await prisma.task.create({
        data: task
    })
}

export const updateTask = async (id, userId, updateData) => {
    return await prisma.task.updateMany({
        where: { id, userId },
        data: updateData
    })
}

export const deleteTask = async (id, userId) => {
    return await prisma.task.deleteMany({
        where: { id, userId }
    })
}
