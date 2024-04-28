import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";

import { User } from "../utils/constants";

import pool from "../db";

const createUser = async (req: User, res: Response, next: NextFunction) => {
  const name = req.name;
  const email = req.email;
  const password = req.password;
  // const hashedPassword = await hashPassword(password);

  pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "データベースのクエリ中にエラーが発生しました。" });
      }
      res.json({ message: "ユーザー作成成功" });
    }
  );
};

const loginUser = async (req: User, res: Response, next: NextFunction) => {
  const email = req.email;
  const password = req.password;

  try {
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
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

          const token = sign(jwtPayload, "JWT_SECRET_KEY", {
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
        } else {
          res.status(401).json({ message: "ログインに失敗しました。" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

// User APIの基本情報を返す関数
const getUsers = (req: User, res: Response, next: NextFunction) => {
  try {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "データベースのクエリ中にエラーが発生しました。" });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

// 特定のユーザー情報を返す関数
const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    pool.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (error, results) => {
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
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const putUserName = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const name = req.body.name;
    pool.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, userId],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            message: "データベースのクエリ中にエラーが発生しました。",
          });
        }
        res.json({
          message: "ユーザー名の更新に成功しました。",
          userName: name,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const putUserEmail = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const email = req.body.email;
    pool.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [email, userId],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            message: "データベースのクエリ中にエラーが発生しました。",
          });
        }
        res.json({
          message: "ユーザー名の更新に成功しました。",
          userEmail: email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    pool.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "データベースのクエリ中にエラーが発生しました。" });
      }
      res.json({ message: "ユーザー削除成功" });
    });
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

export {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  putUserName,
  putUserEmail,
  deleteUser,
};
