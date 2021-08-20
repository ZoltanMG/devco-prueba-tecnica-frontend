import logo from './logo.svg';
import './App.css';
import React, {useEffect } from 'react';


function App() {
  useEffect(() => {
    fetch('http://172.17.37.229:5000/')
    .then(response => response.json())
    .then(data => console.log(data));
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editar <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
