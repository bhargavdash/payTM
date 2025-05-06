"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
const db_1 = require("../db");
const router = (0, express_1.Router)();
const mongoose_1 = __importDefault(require("mongoose"));
// endpoint to get balance
router.get('/balance', userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const account = yield db_1.Account.findOne({ userId: userId });
        if (!account) {
            return res.status(400).json({ error: "Could not fetch balance!!" });
        }
        return res.status(200).json({ balance: account.balance });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// endpoint to transfer money 
router.post("/transfer", userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // start transaction 
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const receiverId = req.body.to;
        const transferAmount = parseInt(req.body.amount);
        const senderId = req.userId;
        console.log(senderId);
        console.log("receiver id: ", receiverId);
        console.log("amount is: ", transferAmount);
        const senderAccount = yield db_1.Account.findOne({ userId: senderId }).session(session);
        if (!senderAccount) {
            yield session.abortTransaction();
            return res.status(400).json({ error: "Could not fetch sender account" });
        }
        const senderBalance = senderAccount.balance;
        if (transferAmount > senderBalance) {
            yield session.abortTransaction();
            return res.status(400).json({ error: "Insufficient Balance!!" });
        }
        const receiverAccount = yield db_1.Account.findOne({ userId: receiverId }).session(session);
        if (!receiverAccount) {
            yield session.abortTransaction();
            return res.status(400).json({ error: "Receiver account not found" });
        }
        // if available balance is there do transaction 
        yield db_1.Account.updateOne({ userId: senderId }, { $inc: { balance: -transferAmount } }).session(session);
        yield db_1.Account.updateOne({ userId: receiverId }, { $inc: { balance: transferAmount } }).session(session);
        session.commitTransaction();
        return res.status(200).json({ message: "Transaction successful!!" });
        // deduct from sender
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
exports.default = router;
