// src/App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CryptoTable from './components/CryptoTable';
import webSocketSimulator from './services/webSocketSimulator';
import './App.css';

function App() {
  useEffect(() => {
    // Connect to WebSocket simulator when component mounts
    const disconnect = webSocketSimulator.connect();
    
    // Disconnect when component unmounts
    return () => disconnect();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Real-Time Crypto Tracker</h1>
        </header>
        <main>
          <CryptoTable />
        </main>
      </div>
    </Provider>
  );
}

export default App;