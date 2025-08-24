import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const userContext = createContext();

const UserContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [isLogind, setIsLogind] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserInfo = async () => {
    try {
        const {data} = await axios.get('http://localhost:3000/api/user/data');
        if(data.success){
            setUserData(data.userData);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  };

  const userAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/auth/auth-verify"
      );
      if (data.success) {
        setIsLogind(true);
        getUserInfo();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    userAuth();
  }, []);

  const value = {
    isLogind,
    setIsLogind,
    userData,
    setUserData,
    getUserInfo
  };

  return (
    <userContext.Provider value={value}>{props.children}</userContext.Provider>
  );
};

export default UserContextProvider;
