import { newGame, gameover, switchPlayer, winner, movePlayer } from '../actions/games';
import { isWinner, isDraw } from '../utils';

/**
 * Checks for a winner
 * @param board
 * @param player
 * @returns {Function}
 */
const checkWinner = (board, player) => (dispatch) => {

  if (isWinner(board, player)) {

    dispatch(winner(player));
    dispatch(gameover());

  } else if (isDraw(board)) {

    dispatch(winner(0));
    dispatch(gameover());

  }
};


/**
 * When a player plays a turn we need to mark that spot on the board.  We then need to
 * switch to the next player
 *
 * @param player
 * @param row
 * @param col
 * @returns {Function}
 */
const playTurn = (player, row, col) => (dispatch) => {
  let nextPlayer;

  switch (player) {
    case 1:
      nextPlayer = 2;
      break;
    case 2:
      nextPlayer = 1;
      break;
    default:
      break;
  }

  dispatch(movePlayer(player, row, col));
  // @todo dispatch(recordMove(nextPlayer));
  dispatch(switchPlayer(nextPlayer));

};

export {
  newGame,
  checkWinner,
  playTurn
};