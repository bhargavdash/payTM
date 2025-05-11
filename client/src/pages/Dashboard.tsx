import { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Header } from "../components/Header";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
}

export const Dashboard = () => {
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response: ", response.data.user);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/signin"); 
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 font-serif">
      <Header firstName={userData?.firstName || "user"} />
      <Balance balance={userData?.balance.toString() || '0'} />
      <Users 
      reloadPage={() => fetchData()}
      />
    </div>
  );
};
