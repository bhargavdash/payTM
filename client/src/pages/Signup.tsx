import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import { useRef } from "react"

export const Signup = () =>{
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const navigateToSignin = () => {
        navigate('/signin');
    }

    const signupUser = () => {
        // collect data from user
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(firstName)
        console.log(lastName)
        console.log(username)
        console.log(password)

        // send backend request
        // clear the input fields ?? 
        // navigate user to dashboard
    }

    return <>
    <div className='font-serif h-screen w-screen flex justify-center items-center'>
        <div className="bg-gray-100 p-6 border rounded-md shadow-xl flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center">
                <p className='text-3xl font-bold'>Sign Up</p>
                <p>Enter your information to create an account</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <InputField 
                label="First Name"
                inputType="text"
                placeholder="Enter your first name" 
                reference={firstNameRef}/>
                <InputField 
                label="Last Name"
                inputType="text"
                placeholder="Enter your last name" 
                reference={lastNameRef}/>
                <InputField 
                label="Username(email)"
                inputType="text"
                placeholder="Enter your username"
                reference={usernameRef} />
                <InputField 
                label="Password"
                inputType="password"
                placeholder="Enter your password" 
                reference={passwordRef}/>
            </div>
            <div>
                <Button 
                text="Sign Up"
                onClick={() => signupUser()} />
            </div>
            <div className="flex">
                <p>Already have an account?&nbsp;</p>
                <p onClick={() => navigateToSignin()} className="hover:cursor-pointer underline">Signin</p>
            </div>
        </div>
    </div>
    </>
}