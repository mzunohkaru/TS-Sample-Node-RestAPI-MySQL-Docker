import { Request, Response, NextFunction } from "express";

import { User } from "../utils/constants";

import pool from "../db";

const createUser = (req: User, res: Response, next: NextFunction) => {
  const name = req.name;
  pool.query(
    "INSERT INTO users (name) VALUES (?)",
    [name],
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

const putUser = (req: User, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    const name = req.name;
    pool.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, userId],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({
              message: "データベースのクエリ中にエラーが発生しました。",
            });
        }
        res.json({ message: "ユーザー更新成功" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const deleteUser = (req: User, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
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

export { createUser, getUsers, getUserById, putUser, deleteUser };
