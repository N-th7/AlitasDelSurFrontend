import React from 'react';
import CloseSesionButton from '../closeSesionButton/CloseSesionButton';
import { useNavigate } from "react-router-dom";

const UpBar = () => {
const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  navigate("/login"); // redirige sin recargar la página
  console.log("Logged out111");
};
    return (
        <div  className= ' bg-[#664631] h-16 flex items-center justify-end px-4 shadow-md'>
            <CloseSesionButton onClick={logout} />
        </div>
    );
};


export default UpBar;


