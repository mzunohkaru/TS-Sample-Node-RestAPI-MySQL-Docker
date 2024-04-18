"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUserById = exports.getUserAPIInfo = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (req, res, next) => {
    const user = await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@example.com",
        },
    });
    console.log(user);
};
exports.createUser = createUser;
// User APIの基本情報を返す関数
const getUserAPIInfo = async (req, res, next) => {
    const users = await prisma.user.findMany();
    console.log(users);
};
exports.getUserAPIInfo = getUserAPIInfo;
// 特定のユーザー情報を返す関数
const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "ユーザーが見つかりません。" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const putUser = async (req, res, next) => {
    const user = await prisma.user.update({
        where: {
            email: "alice@example.com",
        },
        data: {
            name: "Alice Smith",
        },
    });
    console.log(user);
};
exports.putUser = putUser;
const deleteUser = async (req, res, next) => {
    const user = await prisma.user.delete({
        where: {
            email: "alice@example.com",
        },
    });
    console.log(user);
};
exports.deleteUser = deleteUser;
