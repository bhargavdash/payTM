
interface ProfilePicProps {
    initial: string
    onClick: () => void
}

export const ProfilePic = (props: ProfilePicProps) =>  {
    return <>
    <div onClick={props.onClick}
    className="hover:cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 text-gray-100">
        <p>{props.initial}</p>
    </div>
    </>
}