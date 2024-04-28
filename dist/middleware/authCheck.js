"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// Headerの Key : authorization, Value : Bearer [token]
const authCheck = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "認証トークンが提供されていません。" });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, "JWT_SECRET_KEY");
        req.body.user = decoded;
        req.body.userId = String(req.body.user.id);
        if (req.params.id === undefined) {
            next();
        }
        else if (req.params.id === req.body.userId) {
            next();
        }
        else {
            res.status(403).json({ message: "IDが一致しません" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "無効なトークンです。" });
    }
};
exports.authCheck = authCheck;
