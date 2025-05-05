"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(404).json({ error: "Token not found" });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decodedToken) {
            res.status(404).json({ error: "Access Unauthorized" });
            return;
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
        return;
    }
}
exports.default = userMiddleware;
