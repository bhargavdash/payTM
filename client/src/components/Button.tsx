
interface ButtonProps {
    text: string,
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {
    return <>
        <div onClick={props.onClick}
        className='hover:cursor-pointer border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
        text-gray-100 flex justify-center items-center py-4 px-12 rounded-md 
        hover:bg-gradient-to-br hover:from-gray-800 hover:via-gray-600 hover:to-gray-800'>{
            props.text}</div>
    </>
}