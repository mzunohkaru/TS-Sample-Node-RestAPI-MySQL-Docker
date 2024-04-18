"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (req, res, next) => {
    const name = req.name;
    db_1.default.query("INSERT INTO users (name) VALUES (?)", [name], (error, results) => {
        if (error) {
            return res
                .status(500)
                .json({ message: "データベースのクエリ中にエラーが発生しました。" });
        }
        res.json({ message: "ユーザー作成成功" });
    });
};
exports.createUser = createUser;
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
const putUser = (req, res, next) => {
    try {
        const userId = req.params.id;
        const name = req.body.name;
        db_1.default.query("UPDATE users SET name = ? WHERE id = ?", [name, userId], (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({
                    message: "データベースのクエリ中にエラーが発生しました。",
                });
            }
            res.json({ message: "ユーザー更新成功" });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.putUser = putUser;
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
