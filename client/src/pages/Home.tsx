import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/signin')
    })
    return <>
    <div>
        This is Home component
    </div>
    </>
}