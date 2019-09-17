import * as types from '../../constants/actionTypes';

const newGame = () => ({
  type: types.NEW_GAME
});

const resumeGame = (player, move, board) => ({
  type: types.RESUME_GAME,
  payload: { player, move, board }
});

const gameover = () => ({
  type: types.GAMEOVER
});

const movePlayer = (player, row, col) => ({
  type: types.MOVE,
  payload: { player, row, col }
});

const switchPlayer = player => ({
  type: types.PLAYER,
  payload: player
});

const winner = player => ({
  type: types.WINNER,
  payload: player
});

export {
  newGame,
  resumeGame,
  gameover,
  movePlayer,
  switchPlayer,
  winner
};