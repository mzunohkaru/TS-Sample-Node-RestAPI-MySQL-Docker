import { Request, Response, NextFunction } from "express";
import { User } from "../utils/constants";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  next();
};
