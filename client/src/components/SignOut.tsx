import { SignOutIcon } from "./ui/SignOutIcon"

interface SignOutProps {
    onClick: () => void,
}

export const SignOut = (props: SignOutProps) => {
    return <>
    <div onClick={props.onClick} 
    className='absolute top-16 left-[206vh]
    border-b border-l border-r w-32 bg-gray-200 flex gap-2 p-2 hover:cursor-pointer'>
        <SignOutIcon />
        <p>Sign out</p>
    </div>
    </>
}