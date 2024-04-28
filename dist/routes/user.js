"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const user_1 = require("../middleware/user");
const authCheck_1 = require("../middleware/authCheck");
const router = (0, express_1.Router)();
router.post("/", user_1.userMiddleware, (req, res, next) => {
    (0, user_controller_1.createUser)(req.body, res, next);
});
router.post("/login", user_1.userMiddleware, (req, res, next) => {
    (0, user_controller_1.loginUser)(req.body, res, next);
});
router.get("/", user_1.userMiddleware, (req, res, next) => {
    (0, user_controller_1.getUsers)(req.body, res, next);
});
router.get("/:id", (req, res, next) => {
    (0, user_controller_1.getUserById)(req, res, next);
});
router.put("/name/:id", authCheck_1.authCheck, (req, res, next) => {
    (0, user_controller_1.putUserName)(req, res, next);
});
router.put("/email/:id", authCheck_1.authCheck, (req, res, next) => {
    (0, user_controller_1.putUserEmail)(req, res, next);
});
router.delete("/:id", authCheck_1.authCheck, (req, res, next) => {
    (0, user_controller_1.deleteUser)(req.body, res, next);
});
exports.default = router;
