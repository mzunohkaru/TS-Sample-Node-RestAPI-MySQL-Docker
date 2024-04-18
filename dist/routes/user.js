"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = (0, express_1.Router)();
router.post("/", (req, res, next) => {
    (0, user_controller_1.createUser)(req, res, next);
});
router.get("/", (req, res, next) => {
    (0, user_controller_1.getUserAPIInfo)(req, res, next);
});
router.get("/:id", (req, res, next) => {
    (0, user_controller_1.getUserById)(req, res, next);
});
router.put("/:id", (req, res, next) => {
    (0, user_controller_1.putUser)(req, res, next);
});
router.delete("/:id", (req, res, next) => {
    (0, user_controller_1.deleteUser)(req, res, next);
});
exports.default = router;