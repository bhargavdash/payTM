import { useState } from "react"
import { Button } from "./Button"
import { ProfilePic } from "./ProfilePic"
import { SendMoneyModal } from "./SendMoneyModal"

interface RecentUserProps {
    username: string,
    userId: string,
    reloadPage: () => void
}

export const RecentUser = (props: RecentUserProps) => {
    const [showSendMoney, setShowSendMoney] = useState(false)

    const sendMoney = () => {
        setShowSendMoney(true);

    }
    return <>
    <div className='flex justify-between pr-40 items-center'>
        <div className='flex gap-2 items-center'>
            <div>
                <ProfilePic 
                initial={props.username[0].toUpperCase()}
                onClick={() => {}}
                />
            </div>
            <div className='text-xl'>
                {props.username}
            </div>
        </div>
        <div>
            <Button 
            text="Send Money"
            onClick={() => sendMoney()} 
            size="sm"/>
        </div>
    </div>
    {showSendMoney && <div>
        <SendMoneyModal 
        username={props.username}
        userId={props.userId}
        onClick={() => setShowSendMoney(false)}
        reloadPage={props.reloadPage}
        />
        </div>}
    </>
}