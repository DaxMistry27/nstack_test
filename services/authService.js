import prisma from "../config/db.js"
import pool from "../config/pg.js"

export const registerUser = async (user) => {
    return await prisma.user.create({
        data: user
    })
}

export const loginUser = async (email) => {
    return await prisma.user.findUnique(
        {
            where: { email }
        }
    )
}

export const getUserByEmail = async (email) => {
    return await pool.query('select * from public."User" where email = $1',[email])
}

export const saveToken = async (data) => {
    return await prisma.tokenStorage.upsert({
        where: {
            userId: data.userId
        },
        update: {
            accessToken: data.accessToken,
            accessCreatedAt: data.accessCreatedAt,
            accessExpiredAt: data.accessExpiredAt,
            refreshToken: data.refreshToken,
            refreshCreatedAt: data.refreshCreatedAt,
            refreshExpiredAt: data.refreshExpiredAt
        },
        create: data
    });
}

export const getRefreshToken = async (userId) => {
    return await prisma.tokenStorage.findUnique({
        where: { userId }
    })
}

export const removeToken = async (userId) => {
    return await prisma.tokenStorage.update({
        where: { userId },
        data: {
            refreshToken: null,
            accessToken: null
        }
    })
}