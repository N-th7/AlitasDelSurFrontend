import react from "react";

export default function Label({ text, htmlFor }) {
    return (
        <label htmlFor={htmlFor} className="block text-m font-medium text-white mb-1">
            {text}
        </label>
    );
}