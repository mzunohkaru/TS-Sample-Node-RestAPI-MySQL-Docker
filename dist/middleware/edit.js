"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCheck = void 0;
const editCheck = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "認証トークンが提供されていません。" });
    }
    try {
        const decoded = verify(token, "JWT_SECRET_KEY");
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "無効なトークンです。" });
    }
};
exports.editCheck = editCheck;
