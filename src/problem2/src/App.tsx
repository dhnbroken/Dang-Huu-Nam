import React from 'react';
import './App.css';
import ExchangeForm from 'components/ExchangeForm';

function App() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-700 min-h-screen flex flex-col lg:flex-row justify-center items-center">
      <ExchangeForm />
    </div>
  );
}

export default App;
