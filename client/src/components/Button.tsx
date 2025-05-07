
interface ButtonProps {
    text: string,
    onClick: () => void;
    size: string
}

export const Button = (props: ButtonProps) => {
    const size = `${props.size == 'sm' ? "py-3 px-8" : "py-4 px-12"}`

    return <>
        <div onClick={props.onClick}
        className={`hover:cursor-pointer border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
        text-gray-100 flex justify-center items-center ${size} rounded-md 
        hover:bg-gradient-to-br hover:from-gray-800 hover:via-gray-700 hover:to-gray-800`}>{
            props.text}</div>
    </>
}