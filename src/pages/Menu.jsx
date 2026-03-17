import React from 'react';
import MenuOption from '../components/molecules/MenuOption/MenuOption';
import { PackagePlus, BanknoteArrowDown, ClipboardMinus, Package   } from 'lucide-react';

const Menu = () => {
    return (
        <div>
            <div className='md:w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 m-auto'>
                <MenuOption label="Pedido nuevo" Icon={PackagePlus} onClick="/pedido" />
                <MenuOption label="Cerrar caja" Icon={BanknoteArrowDown} onClick="/cierre-caja" />
                <MenuOption label="Ver pedidos" Icon={ClipboardMinus } onClick="/pedidos" />
                <MenuOption label="Administrar productos" Icon={Package } onClick="/productos" />
            </div>
        </div>
    );
};

export default Menu;