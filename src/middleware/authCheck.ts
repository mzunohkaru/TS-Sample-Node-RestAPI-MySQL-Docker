import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Headerの Key : authorization, Value : Bearer [token]
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "認証トークンが提供されていません。" });
  }

  try {
    const decoded = verify(token, "JWT_SECRET_KEY");
    req.body.user = decoded;
    req.body.userId = String(req.body.user.id);
    if (req.params.id === undefined) {
      next();
    } else if (req.params.id === req.body.userId) {
      next();
    } else {
      res.status(403).json({ message: "IDが一致しません" });
    }
  } catch (error) {
    res.status(401).json({ message: "無効なトークンです。" });
  }
};
