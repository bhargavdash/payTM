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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
const userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
dotenv_1.default.config();
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
const router = (0, express_1.Router)();
const signupBody = zod_1.z.object({
    username: zod_1.z.string().email().min(5).max(40),
    password: zod_1.z.string().min(5).max(20)
        .refine((value) => {
        return (/[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*()]/.test(value));
    }),
    firstName: zod_1.z.string().max(20),
    lastName: zod_1.z.string().max(20)
});
// signup route
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse the body through zod
        const { success, error } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ error: error });
        }
        // extract details from request
        const { username, password, firstName, lastName } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield db_1.User.create({
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        // if user is not created then , same username already exits
        if (!user) {
            return res.status(411).json({ error: "User with the same username already exists" });
        }
        // user created successfully , acknowledge the user
        // give user a random balance from 1 to 1000
        const balance = Math.floor(Math.random() * 10000);
        // set balance for that user in his account 
        const accountBalance = yield db_1.Account.create({
            userId: user._id,
            balance: balance
        });
        return res.status(200).json({ message: "User created successfully!!", user: user, balance: accountBalance });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
const signinBody = zod_1.z.object({
    username: zod_1.z.string().email().min(5).max(40),
    password: zod_1.z.string().min(5).max(20)
        .refine((value) => {
        return (/[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*()]/.test(value));
    }),
});
// signin route
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse the input body
        const { success, error } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ error: error });
        }
        // extract data from body 
        const { username, password } = req.body;
        // check if the user exists 
        const user = yield db_1.User.findOne({ username: username });
        if (!user) {
            // user does not exist
            return res.status(411).json({ error: "User does not exist" });
        }
        // match password of the user
        const matchedPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchedPassword) {
            // given password is wrong
            return res.status(411).json({ error: "Incorrect password" });
        }
        // sign jwt token and return the token
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, JWT_SECRET);
        return res.status(200).json({ message: "Sign in successful", token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// authenticated route
router.get('/profile', userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield db_1.User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const accountDetails = yield db_1.Account.findOne({ userId: userId });
        if (!accountDetails) {
            return res.status(400).json({ error: "Account not found" });
        }
        const responseBody = {
            username: user === null || user === void 0 ? void 0 : user.username,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            balance: accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.balance
        };
        return res.status(200).json({ user: responseBody });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
const updateBody = zod_1.z.object({
    password: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional()
});
router.put('/update', userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract details from body , it contains either 3 of them , or 1
        const { success, error } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ error: error });
        }
        // find the user using middleware
        const userId = req.userId;
        const { password, firstName, lastName } = req.body;
        const updateFields = {};
        if (password)
            updateFields.password = yield bcrypt_1.default.hash(password, 5);
        if (firstName)
            updateFields.firstName = firstName;
        if (lastName)
            updateFields.lastName = lastName;
        const updatedUser = yield db_1.User.findByIdAndUpdate(userId, {
            $set: updateFields
        }, {
            new: true, runValidators: true
        });
        if (updatedUser) {
            return res.status(200).json({ message: "User updated successfully", updatedUser: updatedUser });
        }
        // update failed
        else
            return res.status(400).json({ error: "Cannot update user details" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// endpoint to search user 
router.get('/find', userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.User.find({
            $or: [
                { firstName: { $regex: `^${req.query.search}`, $options: 'i' } },
                { lastName: { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        });
        return res.status(200).json({ users: users });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
exports.default = router;
