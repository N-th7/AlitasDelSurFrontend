import React from "react";

export default function Popup({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 font-bold"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
