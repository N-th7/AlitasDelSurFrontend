import react from "react";
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useState } from "react";

export default function LoginForm({ onSubmit, onChange, formData }) {
    return (
        <div className="">
            <h2 className="text-white text-[40px] text-center">Iniciar sesión</h2>
            <form onSubmit={onSubmit} className="">
                <div className="mb-4">
                    <Label text="Usuario"/>  
                    <Input
                        type="text"
                        placeholder="Ingrese su usuario"
                        value={formData.user}
                        onChange={(e) => onChange({ ...formData, user: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <Label text="Contraseña" htmlFor="password" />
                    <Input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.password}
                        onChange={(e) => onChange({ ...formData, password: e.target.value })}
                    />
                </div>
                <Button text="Iniciar sesión" type="submit" />
            </form>
        </div>
    );
}
