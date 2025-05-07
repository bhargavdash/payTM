
interface BalanceProps {
    balance: string
}

export const Balance = (props: BalanceProps) => {
    return <>
    <div className='mt-3 font-bold text-xl'>
        Your balance is : ${parseInt(props.balance)}
    </div>
    </>
}