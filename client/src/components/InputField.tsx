
interface InputFieldProps {
    label: string,
    inputType: string,
    placeholder?: string,
    reference: React.RefObject<HTMLInputElement | null>
}

export const InputField = (props: InputFieldProps) => {
    return <>
        <div className='w-80'>
            <p className='font-bold text-md'>{props.label}</p>
            <input ref={props.reference} className='border w-full p-2 rounded-md'
            type={props.inputType} placeholder={props.placeholder ? props.placeholder : ""}></input>
        </div>
    </>
}