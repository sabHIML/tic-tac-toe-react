import { combineReducers } from 'redux';

import * as types from '../../constants/actionTypes';

const emptyBoard = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

const move = (board, { player, row, col }) => {
  const updated = board.slice();

  updated[row][col] = player;

  return updated;
};


const moveReducer = (state = [[]], action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return [];
      case types.RESUME_GAME:
          return action.payload.move;
    case types.MOVE:
      return [...state, {
        player : action.payload.player,
        col : action.payload.col,
        row : action.payload.row,
     }];
    default:
      return state;
  }
};

const boardReducer = (state = [[]], action) => {
  switch (action.type) {

    case types.NEW_GAME:
      return emptyBoard();
    case types.RESUME_GAME:
      return action.payload.board;
    case types.MOVE:
      return move(state, action.payload);
    default:
      return state;
  }
};

const gameoverReducer = (state = false, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return false;
    case types.GAMEOVER:
      return true;
    case types.WINNER:
      return true;
    default:
      return state;
  }
};

const winnerReducer = (state = -1, action) => {
  switch (action.type) {
    case types.WINNER:
      return action.payload;
    case types.NEW_GAME:
      return -1;
    default:
      return state;
  }
};

const playerReducer = (state = 1, action) => {

  switch (action.type) {
    case types.PLAYER:
      return action.payload;
    case types.NEW_GAME:
      return 1;
    case types.RESUME_GAME:
      return action.payload.player;
    default:
      return state;
  }
};

export default combineReducers({
  board: boardReducer,
  gameover: gameoverReducer,
  winner: winnerReducer,
  player: playerReducer,
  moves: moveReducer
});