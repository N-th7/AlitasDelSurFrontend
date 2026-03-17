import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ToastMessage({ message, type = "success" }) {
  if (!message) return null;

  const bgColor =
    type === "error" ? "bg-red-600" : "bg-green-600";
  const Icon = type === "error" ? XCircle : CheckCircle2;

  return (
    <div
      className={`${bgColor} fixed top-6 right-6 z-50 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-down`}
    >
      <Icon size={20} />
      <span>{message}</span>
    </div>
  );
}
