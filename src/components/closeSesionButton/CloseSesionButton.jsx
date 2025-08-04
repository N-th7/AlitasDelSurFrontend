import React from 'react';

const CloseSesionButton = () => {
    const handleLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
    };

    return (
        <button style={styles.container} onClick={handleLogout} className="close-sesion-button">
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