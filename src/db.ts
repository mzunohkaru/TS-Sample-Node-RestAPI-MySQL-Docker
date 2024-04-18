import mysql from "mysql";

// MySQLへの接続設定
const pool = mysql.createPool({
  host: "mysql",
  user: "user",
  password: "password",
  database: "dev",
  port: 3306,
});

export default pool;

