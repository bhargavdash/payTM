import { useState } from "react"
import { ProfilePic } from "./ProfilePic"
import { SignOut } from "./SignOut"
import { useNavigate } from "react-router-dom"

interface HeaderProps{
    firstName: string
}

export const Header = (props: HeaderProps) => {
    const [openSignOut, setOpenSignOut] = useState(false)
    const navigate = useNavigate()


    const toggleSignOut = () => {
        setOpenSignOut(s => !s)
    }

    const signOutUser = () => {
        localStorage.removeItem("token");
        navigate('/signin')
    }

    return <>
    <div className='font-bold border-b h-12 flex items-center justify-between'>
        <div>
            <p className="text-xl">PayTm</p>
        </div>
        <div className="flex gap-6 items-center">
            <div>
                Hello , {props.firstName}
            </div>
            <div>
                <ProfilePic
                 initial={props.firstName[0].toUpperCase()} 
                 onClick={() => toggleSignOut()}
                />
            </div>
        </div>
    </div>
    {openSignOut && <div className=''>
        <SignOut 
         onClick={() => signOutUser()}/>
        </div>}
    </>
}