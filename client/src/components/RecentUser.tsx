import { Button } from "./Button"

interface RecentUserProps {
    username: string,
    onClick: () => void
}

export const RecentUser = (props: RecentUserProps) => {
    return <>
    <div className='flex justify-between pr-40'>
        <div className='text-xl'>
            {props.username}
        </div>
        <div>
            <Button 
            text="Send Money"
            onClick={props.onClick} 
            size="sm"/>
        </div>
    </div>
    </>
}