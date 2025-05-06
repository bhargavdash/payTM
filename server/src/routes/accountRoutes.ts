import { Router, Request } from "express";
import userMiddleware from "../middleware/userMiddleware";
import { Account } from "../db";
const router = Router()
import mongoose from "mongoose";

interface CustomRequest extends Request {
    userId?: string
}


// endpoint to get balance
router.get('/balance',userMiddleware, async(req: CustomRequest, res): Promise<any> => {
    try{
        const userId = req.userId;
        const account = await Account.findOne({userId: userId});
        if(!account){
            return res.status(400).json({error: "Could not fetch balance!!"});
        }
        return res.status(200).json({balance: account.balance})
    } catch(err){
        console.log(err);
        return res.status(400).json({error: err})
    }
})

interface TransferRequest extends CustomRequest {
    to?: string,
    amount?: string
}

// endpoint to transfer money 
router.post("/transfer", userMiddleware, async(req: TransferRequest, res): Promise<any> => {
    try{
        // start transaction 
        const session = await mongoose.startSession()
        session.startTransaction()

        const receiverId = req.body.to as string;
        const transferAmount = parseInt(req.body.amount as string);

        const senderId = req.userId;
        console.log(senderId)
        console.log("receiver id: ", receiverId)
        console.log("amount is: ", transferAmount)
        const senderAccount = await Account.findOne({userId: senderId}).session(session);

        if(!senderAccount){
            await session.abortTransaction()
            return res.status(400).json({error: "Could not fetch sender account"})
        }
        const senderBalance = senderAccount.balance as number;

        if(transferAmount > senderBalance){
            await session.abortTransaction()
            return res.status(400).json({error: "Insufficient Balance!!"})
        }

        const receiverAccount = await Account.findOne({userId: receiverId}).session(session);

        if(!receiverAccount){
            await session.abortTransaction();
            return res.status(400).json({error: "Receiver account not found"});
        }

        // if available balance is there do transaction 

        await Account.updateOne({userId: senderId}, {$inc: {balance:-transferAmount}}).session(session);
        await Account.updateOne({userId: receiverId}, {$inc:{balance:transferAmount}}).session(session);

        session.commitTransaction()

        return res.status(200).json({message: "Transaction successful!!"})

        // deduct from sender
        
    } catch(err){
        console.log(err);
        return res.status(400).json({error: err})
    }
})

export default router