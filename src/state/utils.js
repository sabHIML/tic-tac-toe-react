const winningPatterns = [

  // rows
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],

  // columns
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],

  // crosses
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]],

];


/**
 * Checks to see if there's a winner
 * @param board
 * @param player
 * @returns {boolean}
 */
const isWinner = (board, player) =>
  winningPatterns.some(pattern => pattern.every(box =>
      board[ box[0] ][ box[1] ] === player
  ));


/**
 * Checks to see if there's a draw on the board
 *  if there are boxs that have a 0 in them, that means the
 *  game is still in-progress
 *
 * @param board
 * @returns {boolean}
 */
const isDraw = board => !board.some(row => row.some(col => col === 0));

export {
  isWinner,
  isDraw
};