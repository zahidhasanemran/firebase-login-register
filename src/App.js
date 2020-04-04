import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Login></Login>
    </div>
  );
}

export default App;
