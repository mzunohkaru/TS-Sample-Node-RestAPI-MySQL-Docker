"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCheck = void 0;
// // Request インターフェースを拡張
// interface RequestWithUser extends Request {
//   user: {
//     id: string;
//   };
// }
const editCheck = (req, res, next) => {
    // const userId = req.user.id;
    // if (userId !== req.params.id) {
    //   return res.status(403).json({ message: "ユーザーIDが一致しません。" });
    // }
    console.log("editCheck", req.params.id);
    try {
        next();
    }
    catch (error) {
        res.status(401).json({ message: "無効なトークンです。" });
    }
};
exports.editCheck = editCheck;
