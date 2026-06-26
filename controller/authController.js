import jwt from "jsonwebtoken";
import { registerUser, loginUser, getRefreshToken, getUserByEmail, saveToken, removeToken } from "../services/authService.js"
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

dotenv.config();

export const registerUserController = async (req, res, next) => {
    try {
        // console.log(req);

        const { name, email, password } = req.body;

        const isEmailExist = await getUserByEmail(email);

        if (isEmailExist.rowCount > 0) {
            return next(new AppError("Email is already registered", 400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await registerUser({
            name,
            email,
            password: hashedPassword
        });

        logger.info(`User ${email} registered`);

        return res.status(201).json({
            success: true,
            message: "Successfully Registered.",
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        next(error)
    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email);

        if (user) {

            const isMatched = await bcrypt.compare(password, user.password);

            if (isMatched) {
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.ACCESS_SECRET,
                    {
                        expiresIn: "15m"
                    }
                )

                const refreshToken = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.REFRESH_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )

                await saveToken({
                    userId: user.id,
                    accessToken,
                    accessCreatedAt: new Date(),
                    accessExpiredAt: new Date(Date.now() + 15 * 60 * 1000),

                    refreshToken,
                    refreshCreatedAt: new Date(),
                    refreshExpiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 15 * 60 * 1000
                });

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                logger.info(`User ${email} logged in`);

                return res.status(200).json({
                    success: true,
                    message: "Login Successfully",
                    accessToken,
                    refreshToken
                })

            } else if (!isMatched) {
                return next(new AppError("Invalid Credential", 401));
            }
        } else if (!user) {
            return next(new AppError("Invalid Credential", 401));
        }
    } catch (error) {
        next(error)
    }
}

export const refreshTokenController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return next(new AppError("Refresh token missing", 403));
        }

        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const tokenRecord = await getRefreshToken(payload.id);

        if (!tokenRecord || tokenRecord.refreshToken !== refreshToken) {
            return next(new AppError("Invalid refresh token", 403));
        }

        const accessToken = jwt.sign(
            {
                id: payload.id,
                role: payload.role
            },
            process.env.ACCESS_SECRET,
            {
                expiresIn: "15m"
            }
        )
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        await saveToken({
            userId: payload.id,
            accessToken,
            accessCreatedAt: new Date(),
            accessExpiredAt: new Date(Date.now() + 15 * 60 * 1000),

            // keep old refresh token values
            refreshToken: tokenRecord.refreshToken,
            refreshCreatedAt: tokenRecord.refreshCreatedAt,
            refreshExpiredAt: tokenRecord.refreshExpiredAt
        });

        return res.status(200).json({
            success: true,
            accessToken,
        });

    } catch (error) {
        next(error)
    }
}

export const logoutController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });
        }

        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        await removeToken(payload.id);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error)
    }
}