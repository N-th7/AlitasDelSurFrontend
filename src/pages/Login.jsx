import React, { useState } from "react";
import LoginForm from "../components/molecules/LoginForm";
import { login } from "../api/loginService";
import Popup from "../components/molecules/Popup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [popup, setPopup] = useState({ message: "", type: "success" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (newData) => {
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.user, formData.password);
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      setPopup({ message: "Login successful!", type: "success" });
    navigate("/menu");
    } else {
      setPopup({ message: result.error, type: "error" });
    }
     setTimeout(() => setPopup({ message: "", type: "success" }), 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/alitas.jpg')" }}
      ></div>
      {/* Contenido */}
      <div className="relative z-10 bg-[#992900]/[0.9] p-8 rounded shadow-md w-full max-w-md ">
        <LoginForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
         <Popup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "" })} />
      </div>
    </div>
  );
}
