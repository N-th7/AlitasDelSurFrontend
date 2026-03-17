import react from "react";
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({ onSubmit, onChange, formData }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="">
            <h2 className="text-white text-[40px] text-center">Iniciar sesión</h2>
            <form onSubmit={onSubmit} className=" grid grid-cols-1 gap-6 mt-8">
                <div className="mb-4">
                    <Label text="Usuario"/>  
                    <Input
                        type="text"
                        placeholder="Ingrese su usuario"
                        value={formData.user}
                        onChange={(e) => onChange({ ...formData, user: e.target.value })}
                        className= "w-full px-4 py-2.5 rounded-lg border-2 border-[#ff9b1a] bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffba61] transition-all pr-12"
                    />
                </div>
                 <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => onChange({ ...formData, password: e.target.value })}
                  placeholder="************"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-[#ff9b1a] bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffba61] transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#664631] hover:text-[#896042] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
                 <button
              type="submit"
              className="w-full bg-[#ffba61] hover:bg-[#ff9b1a] text-[#664631] py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Iniciar sesión
            </button>
            </form>
        </div>
    );
}
