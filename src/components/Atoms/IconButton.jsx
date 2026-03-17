import React from "react";

export default function IconButton({
  icon: Icon,
  onClick,
  title,
  color = "text-gray-700 hover:text-gray-900",
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} transition-colors`}
      title={title}
    >
      <Icon size={20} />
    </button>
  );
}
