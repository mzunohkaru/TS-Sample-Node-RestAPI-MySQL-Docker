"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userMiddleware = (req, res, next) => {
    const user = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    next();
};
exports.userMiddleware = userMiddleware;
