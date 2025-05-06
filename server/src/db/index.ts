import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, unique:true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const accountSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref:'User', unique: true, required: true},
    balance: {type: Number, required: true}
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema)

export {User, Account}