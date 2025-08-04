import React from 'react';

const MenuButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className='p-1 pl-2 pr-2 bg-[#ECBA79] hover:bg-[#A65132] rounded-xl w-1/5 m-2'
    >
      {props.label}
    </button>
  );
};

export default MenuButton;