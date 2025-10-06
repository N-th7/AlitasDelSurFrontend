import React from 'react';
import { Link } from "react-router-dom";

const MenuOption = ({ label, icon, onClick }) => {
    return (
        <Link to={onClick}>
           <div className="bg-[#EFBD7C] text-center md:w-max p-5 rounded-md m-auto">
             <button className="">
                {icon && <img src={icon} alt={label} width="100" className="menu-option__icon m-auto " />}
                <span className="menu-option__label">{label}</span>
            </button>
           </div>
        </Link>
    );
};

export default MenuOption;