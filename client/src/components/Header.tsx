import { useState } from "react"
import { ProfilePic } from "./ProfilePic"
import { SignOut } from "./SignOut"

interface HeaderProps{
    username: string
}

export const Header = (props: HeaderProps) => {
    const [openSignOut, setOpenSignOut] = useState(false)


    const toggleSignOut = () => {
        setOpenSignOut(s => !s)
    }

    return <>
    <div className='font-bold border-b h-12 flex items-center justify-between'>
        <div>
            <p className="text-xl">PayTm</p>
        </div>
        <div className="flex gap-6 items-center">
            <div>
                Hello , {props.username}
            </div>
            <div>
                <ProfilePic
                 initial={props.username[0].toUpperCase()} 
                 onClick={() => toggleSignOut()}
                />
            </div>
        </div>
    </div>
    {openSignOut && <div className=''>
        <SignOut 
         onClick={() => alert("Signout clicked")}/>
        </div>}
    </>
}