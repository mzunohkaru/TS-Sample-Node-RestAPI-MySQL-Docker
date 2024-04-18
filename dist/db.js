"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// MySQLへの接続設定
const pool = mysql_1.default.createPool({
    host: "mysql",
    user: "user",
    password: "password",
    database: "dev",
    port: 3306,
});
exports.default = pool;
