import { RecentUser } from "./RecentUser"

export const Users = () => {
    return <>
    <div className='mt-6 flex flex-col gap-4'>
        <div className='text-lg font-bold'>Users</div>
        <div>
            <input className="border w-[80%] rounded-sm p-2"
            type="text" placeholder="Search users..."/>
        </div>
        <div>
            Implement users lookup in the search functionality
            Add upto 5 recent visited users here
        </div>
        <RecentUser
         username="test-user-1"
         onClick={() => alert("Send money clicked")} />
         <RecentUser
         username="test-user-2"
         onClick={() => alert("Send money clicked")} />
         <RecentUser
         username="test-user-3"
         onClick={() => alert("Send money clicked")} />
    </div>
    </>
}