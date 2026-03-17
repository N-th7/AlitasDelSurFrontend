import React from 'react';
import { Link } from "react-router-dom";

const MenuOption = ({ label, Icon, onClick }) => {
    return (
        <Link to={onClick}>
           <div className="bg-[#d9d9d9]/80 h-full hover:bg-[#d9d9d9] backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center gap-4">
             <button className="">
                {Icon && <Icon size={120} className="text-[#664631] text-center m-auto" />}
                <span className="text-2xl font-semibold  text-[#664631]">{label}</span>
            </button>
           </div>
        </Link>
    );
};

export default MenuOption;