import logo from './logo.svg';
import './App.css';
import React from 'react';  
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className='bg-[#f3b15b] min-h-screen'>
      <AppRouter />
    </div>
  );
}

export default App;
