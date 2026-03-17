import React from "react";

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const baseStyles =
    "px-4 py-2 rounded font-medium transition-all duration-200";

  const variants = {
    primary: "bg-[#FF9B1A] text-white hover:bg-[#e78a14]",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-[#FF9B1A] text-[#FF9B1A] hover:bg-[#FF9B1A] hover:text-white",
    ghost: "text-[#FF9B1A] hover:bg-[#ffe5c7]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {text}
    </button>
  );
}
