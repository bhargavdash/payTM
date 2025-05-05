"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.log("Connected to DB!!");
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', userRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
