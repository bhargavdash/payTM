import { Balance } from "../components/Balance"
import { Header } from "../components/Header"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <>
    <div className='p-4 font-serif'>
        <Header  username="user"/>
        <Balance balance="1000" />
        <Users />
    </div>
    </>
}