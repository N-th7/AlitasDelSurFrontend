import React from 'react';
import MenuOption from '../components/MenuOption/MenuOption';

const Menu = () => {
    return (
        <div>
            <div className='md:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 m-auto'>
                <MenuOption label="Pedido nuevo" icon="/caja.png" onClick="/pedido" />
                <MenuOption label="Cerrar caja" icon="/presupuesto.png" onClick="" />
                <MenuOption label="Cancelar pedido" icon="/error.png" onClick="" />
            </div>
        </div>
    );
};

export default Menu;