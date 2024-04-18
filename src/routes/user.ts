import { Router, Request, Response, NextFunction } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  putUser,
  deleteUser,
} from "../controllers/user_controller";

import { User } from "../utils/constants";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: req.body.id,
    name: req.body.name,
  };

  createUser(user, res, next);
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: req.body.id,
    name: req.body.name,
  };

  getUsers(user, res, next);
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
