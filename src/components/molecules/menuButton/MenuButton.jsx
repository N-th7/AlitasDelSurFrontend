import React from "react";

const MenuButton = ({ variant = "default", onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white/80 hover:bg-white border-2 border-transparent hover:border-[#664631] transition-all rounded-xl shadow-md hover:shadow-lg ${
        variant === "small" ? "px-4 py-2 text-xl" : "px-6 py-3 text-2xl"
      } font-medium text-[#1a1a1a] hover:scale-105 active:scale-95`}
    >
      {label}
    </button>
  );
};

export default MenuButton;
