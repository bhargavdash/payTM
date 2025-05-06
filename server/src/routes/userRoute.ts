import { Router } from "express";
import { z } from 'zod';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Account, User} from "../db";
import dotenv from 'dotenv'
import userMiddleware from "../middleware/userMiddleware";
import { Request } from "express";

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET ?? "";
const router = Router();

const signupBody = z.object({
    username: z.string().email().min(5).max(40),
    password: z.string().min(5).max(20)
              .refine((value) => {
                return (
                    /[A-Z]/.test(value) && 
                    /[a-z]/.test(value) && 
                    /[0-9]/.test(value) && 
                    /[!@#$%^&*()]/.test(value)
                );
              }),
    firstName: z.string().max(20),
    lastName: z.string().max(20)

})

// signup route
router.post('/signup', async(req, res): Promise<any> => {

    try{
        // parse the body through zod
        const {success, error} = signupBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({error: error});
        }

        // extract details from request
        const {username, password, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        // if user is not created then , same username already exits
        if(!user){
            return res.status(411).json({error: "User with the same username already exists"})
        }
        // user created successfully , acknowledge the user
        // give user a random balance from 1 to 1000
        const balance = Math.floor(Math.random()*10000)

        // set balance for that user in his account 
        const accountBalance = await Account.create({
            userId: user._id,
            balance: balance
        })
        return res.status(200).json({message: "User created successfully!!", user: user, balance: accountBalance})

    } catch(err){
        console.log(err);
        return res.status(400).json({error: err})
    }
})

const signinBody = z.object({
    username: z.string().email().min(5).max(40),
    password: z.string().min(5).max(20)
              .refine((value) => {
                return (
                    /[A-Z]/.test(value) && 
                    /[a-z]/.test(value) && 
                    /[0-9]/.test(value) && 
                    /[!@#$%^&*()]/.test(value)
                );
              }),
})
// signin route
router.post('/signin', async(req, res): Promise<any> => {
    try{
        // parse the input body
        const {success, error} = signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({error: error});
        }

        // extract data from body 
        const {username, password} = req.body;
        
        // check if the user exists 
        const user = await User.findOne({username: username});
        if(!user){
            // user does not exist
            return res.status(411).json({error: "User does not exist"});
        }
        // match password of the user
        const matchedPassword = await bcrypt.compare(password, user.password);

        if(!matchedPassword){
            // given password is wrong
            return res.status(411).json({error: "Incorrect password"});
        }
        // sign jwt token and return the token
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.status(200).json({message: "Sign in successful", token: token})
    } catch(err){
        console.log(err);
        return res.status(400).json({error: err});
    }
})

interface CustomRequest extends Request{
    userId?: string;
}

// authenticated route
router.get('/profile',userMiddleware, (req: CustomRequest, res)=> {
    const userId = req.userId;
    res.send(userId)
})

interface UpdateRequest extends CustomRequest {
    password?: string,
    firstName?: string, 
    lastName?: string
}

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put('/update',userMiddleware, async(req: UpdateRequest, res): Promise<any> => {
    try{
        // extract details from body , it contains either 3 of them , or 1
        const {success, error} = updateBody.safeParse(req.body);

        if(!success){
            return res.status(400).json({error: error});
        }
        
        // find the user using middleware
        const userId = req.userId;
        
        const {password, firstName, lastName} = req.body;
        const updateFields : {
            password?: string,
            firstName?: string,
            lastName?:string
        } = {}

        if(password) updateFields.password = await bcrypt.hash(password, 5);
        if(firstName) updateFields.firstName = firstName;
        if(lastName) updateFields.lastName = lastName;

       
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: updateFields
        }, {
            new: true, runValidators: true
        })

        if(updatedUser){
            return res.status(200).json({message: "User updated successfully", updatedUser: updatedUser})
        }
        // update failed
        else return res.status(400).json({error: "Cannot update user details"});

    } catch(err){
        console.log(err);
        return res.status(400).json({error: err})
    }
})
export default router