"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUserEmail = exports.putUserName = exports.getUserById = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = __importDefault(require("../db"));
const createUser = async (req, res, next) => {
    const name = req.name;
    const email = req.email;
    const password = req.password;
    // const hashedPassword = await hashPassword(password);
    db_1.default.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (error, results) => {
        if (error) {
            return res
                .status(500)
                .json({ message: "データベースのクエリ中にエラーが発生しました。" });
        }
        res.json({ message: "ユーザー作成成功" });
    });
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    const email = req.email;
    const password = req.password;
    try {
        db_1.default.query("SELECT * FROM users WHERE email = ?", [email], async (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: "データベースのクエリ中にエラーが発生しました。",
                });
            }
            if (results[0].password === password) {
                // トークン発行
                const jwtPayload = {
                    id: results[0].id,
                };
                const token = (0, jsonwebtoken_1.sign)(jwtPayload, "JWT_SECRET_KEY", {
                    expiresIn: "1h",
                });
                // トークンを Cookie に設定
                // res.cookie("token", token, {
                //   httpOnly: true,
                //   secure: true,
                // });
                res.json({
                    message: "ログインに成功しました。",
                    userName: results[0].name,
                    token: token,
                });
            }
            else {
                res.status(401).json({ message: "ログインに失敗しました。" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.loginUser = loginUser;
// User APIの基本情報を返す関数
const getUsers = (req, res, next) => {
    try {
        db_1.default.query("SELECT * FROM users", (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ message: "データベースのクエリ中にエラーが発生しました。" });
            }
            res.json(results);
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.getUsers = getUsers;
// 特定のユーザー情報を返す関数
const getUserById = (req, res, next) => {
    try {
        const userId = req.params.id;
        db_1.default.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: "データベースのクエリ中にエラーが発生しました。",
                });
            }
            if (results.length === 0) {
                return res
                    .status(404)
                    .json({ message: "指定されたIDのユーザーが見つかりません。" });
            }
            res.json(results[0]);
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.getUserById = getUserById;
const putUserName = (req, res, next) => {
    try {
        const userId = req.params.id;
        const name = req.body.name;
        db_1.default.query("UPDATE users SET name = ? WHERE id = ?", [name, userId], (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: "データベースのクエリ中にエラーが発生しました。",
                });
            }
            res.json({
                message: "ユーザー名の更新に成功しました。",
                userName: name,
            });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.putUserName = putUserName;
const putUserEmail = (req, res, next) => {
    try {
        const userId = req.params.id;
        const email = req.body.email;
        db_1.default.query("UPDATE users SET email = ? WHERE id = ?", [email, userId], (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: "データベースのクエリ中にエラーが発生しました。",
                });
            }
            res.json({
                message: "ユーザー名の更新に成功しました。",
                userEmail: email,
            });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.putUserEmail = putUserEmail;
const deleteUser = (req, res, next) => {
    try {
        const userId = req.params.id;
        db_1.default.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ message: "データベースのクエリ中にエラーが発生しました。" });
            }
            res.json({ message: "ユーザー削除成功" });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.deleteUser = deleteUser;
