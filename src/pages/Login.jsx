import React, { useState } from "react";
import LoginForm from "../components/organism/LoginForm";
import { login } from "../api/loginService";
import Popup from "../components/molecules/Popup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [popup, setPopup] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  const handleChange = (newData) => {
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData.user, formData.password);

    if (result.success) {

      localStorage.setItem("token", result.data.token);

      localStorage.setItem("user", JSON.stringify(result.data.user));
      console.log("Usuario almacenado:", result.data.user);

      setPopup({ message: "¡Inicio de sesión exitoso!", type: "success" });

      navigate("/menu");
    } else {
      setPopup({ message: result.error, type: "error" });
    }

    setTimeout(() => setPopup({ message: "", type: "success" }), 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/alitas.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-black/30">
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="relative z-10 bg-[#67432F] p-8 rounded-2xl shadow-md w-full max-w-md">

            <LoginForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <div className="text-center mt-6">
              <p className="text-white/70 text-sm">
                Alitas del sur - Sistema de ventas
              </p>
            </div>

            <Popup
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup({ message: "" })}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
