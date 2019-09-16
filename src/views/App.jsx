import React from 'react';
import Board from './containers/board';

const App = () => {
  return (
    <div id='tictactoe'>
      <div id='head'>
        <header>
          <h2>Tic Tac Toe</h2>
        </header>
      </div>
      <Board />
    </div>
  );
};

export default App;