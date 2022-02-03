import React from 'react';
import './App.css';
import GamesList from './components/GamesList';
import store from './stores/store';

function App() {
  return (
    <div className="App">
      <button onClick={() => store.fetch()}>Загрузить</button>
      <GamesList/>
    </div>
  );
}

export default App;
