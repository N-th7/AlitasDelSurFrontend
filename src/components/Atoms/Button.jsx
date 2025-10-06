import react from "react";
export default function Button({ text, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-[#FF9B1A] text-white px-4 py-2 rounded"
        >
            {text}
        </button>
    );
}