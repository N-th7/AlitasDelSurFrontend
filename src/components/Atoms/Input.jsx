import react from "react";

export default function Input({ type, placeholder, value, onChange, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className= {className}
        />
    );
}