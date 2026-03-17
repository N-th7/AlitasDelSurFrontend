import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft } from "lucide-react";

const UpBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const goBack = () => {
    navigate(-1);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logged out");
  };

  return (
    <header className="bg-[#664631] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        
        <div className="flex items-center gap-3 text-center sm:text-left">

          {token && (
            <button
              onClick={goBack}
              className="bg-[#ff9b1a] hover:bg-[#e68814] text-white p-2 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 sm:w-24 md:w-28 rounded-lg"
          />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Alitas del Sur
            </h1>
            <p className="text-xs sm:text-sm text-[#ff9b1a]">
              Sistema de Ventas
            </p>
          </div>
        </div>

        {token && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default UpBar;
