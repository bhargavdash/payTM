import { useEffect, useState } from "react"
import { RecentUser } from "./RecentUser"
import axios from "axios"

interface User {
    username: string,
    firstName: string,
    lastName: string,
    _id: string
}

export const Users = ({reloadPage} : {reloadPage: () => void}) => {
    const [searchedUser, setSearchedUser] = useState('')
    const [userList, setUserList] = useState<User[]>([])
    

    console.log("Search value: ", searchedUser)

    useEffect(() => {
        const findUser = async () => {
            const response = await axios.get(`http://localhost:3000/api/v1/user/find?search=${searchedUser}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUserList(response.data.users)
        }
        const timer = setTimeout(() => {
            findUser()
        }, 500)

        return () => clearTimeout(timer)
    },[searchedUser])

    

    return <>
    <div className='mt-6 flex flex-col gap-4'>
        <div className='text-lg font-bold'>Users:</div>
        <div>
            <input onChange={(e) => setSearchedUser(e.target.value)}
            className="border w-[80%] rounded-sm p-2"
            type="text" placeholder="Search users..."/>
        </div>
        <div className='flex flex-col gap-2'>
            {userList.length === 0 && <div className="font-bold text-md">No results found</div>}
            {userList.map((user,index) => {
                return <div 
                 key={index}>
                    <RecentUser
                        username={user.firstName}
                        userId={user._id}
                        reloadPage={reloadPage}
                        />
                    </div>
            })}
        </div>
    </div>
    
    </>
}