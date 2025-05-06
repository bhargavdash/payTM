"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
const accountSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: 'User', unique: true, required: true },
    balance: { type: Number, required: true }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Account = mongoose_1.default.model('Account', accountSchema);
exports.Account = Account;
