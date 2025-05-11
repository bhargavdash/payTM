import { useRef } from "react"
import { ProfilePic } from "./ProfilePic"
import axios from "axios"

interface SendMoneyProps {
    username: string,
    userId: string
    onClick: () => void,
    reloadPage: () => void
}

export const SendMoneyModal = (props: SendMoneyProps) => {
    const amountRef = useRef<HTMLInputElement>(null)

    const transferMoney = async () => {
        const amount = amountRef.current?.value

        const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
            to: props.userId,
            amount: amount
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
        )
        console.log(response.data)
        props.reloadPage()
        props.onClick()
    }

    return <>
    <div className='flex flex-col justify-between rounded-md bg-gray-200 absolute top-[40%] left-[30%] w-[500px] h-[250px] border p-2'>
        <div className='flex justify-between'>
            <div className="font-bold text-lg">Send Money</div>
            <div onClick={props.onClick}
        className='border p-1 rounded-md hover:cursor-pointer' >Close</div>
        </div>
        <div>
            <div className='flex gap-3 items-center'>
                <ProfilePic 
                initial={props.username[0].toUpperCase()}
                onClick={() => {}} />
                <div>{props.username}</div>
            </div>
            <div>
                <div className='font-bold text-sm'>Amount (in $)</div>
                <input ref={amountRef} className="p-2 rounded-md border w-full"
                type="text" placeholder="Enter amount"/>
            </div>
            <div onClick={() => transferMoney()} className="hover:cursor-pointer mt-4 py-2 border rounded-md w-full flex justify-center items-center">
                Initiate Transfer
            </div>
        </div>
    </div>
    </>
}