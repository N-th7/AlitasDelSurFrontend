import React from 'react';

const CloseSesionButton = ({onClick}) => {

    return (
        <button style={styles.container} onClick={onClick} className="close-sesion-button">
            Cerrar Sesión
        </button>
    );
};

const styles = {
    container: {
        padding: '5px 9px',
        backgroundColor: '#E61200',
        color: '#ffffff',
        border: '1px solid black',
        borderRadius: '15px',
        position: 'absolute',
        right: '3%',
    }
};

export default CloseSesionButton;