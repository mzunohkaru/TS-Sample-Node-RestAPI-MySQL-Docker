import { Router, Request, Response, NextFunction } from "express";

import {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  putUserName,
  putUserEmail,
  deleteUser,
} from "../controllers/user_controller";

import { userMiddleware } from "../middleware/user";
import { authCheck } from "../middleware/authCheck";

const router = Router();

router.post("/", userMiddleware, authCheck, (req: Request, res: Response, next: NextFunction) => {
  createUser(req.body, res, next);
});

router.post("/login", userMiddleware, (req: Request, res: Response, next: NextFunction) => {
  loginUser(req.body, res, next);
});

router.get("/", userMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getUsers(req.body, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  getUserById(req, res, next);
});

router.put("/name/:id", authCheck, (req: Request, res: Response, next: NextFunction) => {
  putUserName(req, res, next);
});

router.put("/email/:id", authCheck, (req: Request, res: Response, next: NextFunction) => {
  putUserEmail(req, res, next);
});

router.delete("/:id", authCheck, (req: Request, res: Response, next: NextFunction) => {
  deleteUser(req.body, res, next);
});

export default router;
