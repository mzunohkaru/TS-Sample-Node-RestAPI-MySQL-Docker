import { Request, Response, NextFunction } from "express";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "User API" });
};

// User APIの基本情報を返す関数
const getUserAPIInfo = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "User API" });
};

// 特定のユーザー情報を返す関数
const getUserById = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: `User ${req.params.id}` });
};

const putUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: `User ${req.params.id}` });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: `User ${req.params.id}` });
};

export { createUser, getUserAPIInfo, getUserById, putUser, deleteUser };
