import { Router, Request, Response, NextFunction } from "express";

import {
  createUser,
  getUserAPIInfo,
  getUserById,
  putUser,
  deleteUser,
} from "../controllers/user_controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  createUser(req, res, next);
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  getUserAPIInfo(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  getUserById(req, res, next);
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  putUser(req, res, next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  deleteUser(req, res, next);
});

export default router;
