import React from 'react';
import CloseSesionButton from '../closeSesionButton/CloseSesionButton';

const UpBar = () => {
    return (
        <div style={styles.container}>
            <CloseSesionButton />
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#664631',
        padding: '20px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center', 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    title: {
        margin: 0,
        fontSize: '28px',
        color: '#333',
    },
};

export default UpBar;