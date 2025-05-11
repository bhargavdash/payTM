import { InputField } from "../components/InputField"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate('/signup')
    }

    const signinUser = async () => {
        // collect user data
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(username);
        console.log(password);

        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username: username,
            password: password
        })

        console.log(response.data);

        localStorage.setItem("token", response.data.token)

        navigate('/dashboard')
    }

    return <>
    <div className='font-serif h-screen w-screen flex justify-center items-center'>
            <div className="bg-gray-100 p-6 border rounded-md shadow-xl flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                    <p className='text-3xl font-bold'>Sign In</p>
                    <p>Enter your credentials to access your account</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <InputField 
                    label="Username(email)"
                    inputType="text"
                    placeholder="Enter your username"
                    reference={usernameRef} />
                    <InputField 
                    label="Password"
                    inputType="password"
                    placeholder="Enter your password"
                    reference={passwordRef} />
                </div>
                <div>
                    <Button 
                    text="Sign In"
                    onClick={() => signinUser()}
                    size="md" />
                </div>
                <div className="flex">
                    <p>Don't have an account?&nbsp;</p>
                    <p onClick={() => navigateToSignup()} className="hover:cursor-pointer underline">Signup</p>
                </div>
            </div>
        </div>
    </>
}