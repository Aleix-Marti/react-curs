import React from 'react';
import './App.css';
import Header from './components/Header';
import Travel from './components/Travel';

function App() {
  

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Travel />
      </main>
      <footer className="footer">
        <p>© 2025 Planificador de Viatges - Creat amb React i Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;