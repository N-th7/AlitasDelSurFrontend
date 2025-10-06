import React from 'react';

const MenuButton = (props) => {
  const styles = {
    primary: ' bg-[#ECBA79] hover:bg-[#A65132] rounded-xl px-10 py-2 m-2',
    secondary: 'bg-[#896042] hover:bg-[#A65132] text-white rounded-xl px-5 py-2 m-2',
  };

  return (
    <button
      onClick={props.onClick}
       className={`${styles[props.variant]}`}
    >
      {props.label}
    </button>
  );
};

export default MenuButton;