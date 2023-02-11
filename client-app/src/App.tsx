// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React from 'react';
import logo from './logo.svg';
import './App.css';
// Commented demo code.
// Date - 11th Feb, 2023.
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {ducks.map(duck => (
          // When we are looping over in react then you will need to assign key for opening element.
          // Date - 11th Feb, 2023. 
          <DuckItem duck={duck} key={duck.name} />
        ))} */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload!!!
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
