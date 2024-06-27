import React from 'react';
import './App.css';
import TransactionList from './components/TransactionList';
//import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <TransactionList />
      </main>
    </div>
  );
}

export default App;