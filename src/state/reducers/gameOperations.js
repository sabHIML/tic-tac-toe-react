import { newGame , resumeGame as resumeGameAction, gameover, switchPlayer, winner, movePlayer } from '../actions';
import { isWinner, isDraw, showNotification } from '../utils';
import * as configs from '../../config/api';

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
 *
 * @param player
 * @returns {number}
 * @private
 */
const _nextPlayer = player => {
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

    return nextPlayer;
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
  const nextPlayer = _nextPlayer(player);

  dispatch(movePlayer(player, row, col));
  dispatch(switchPlayer(nextPlayer));

};

/**
 * start a fresh game or resume it from game-id stored in localstorage
 *
 * @returns {Function}
 */
const startGame = () => {
    if (localStorage.getItem("gameId") === null) {
        return startNewGame();
    } else {
        return resumeGame();
    }
};

/**
 * Resume ongoing game.
 *
 * pick game-id from localstorage
 * fetch state info from api by game id
 * set the board with fetched state
 * check is already game win by a player.
 *
 * in case of any failure, start a fresh game.
 *
 * @returns {Function}
 */
const resumeGame = () => (dispatch) => {

    let gameId;
    try {
        gameId = localStorage.getItem('gameId');
    } catch {

        showNotification("Sorry! can'r resume you game, let's play a fresh game.");
        dispatch(startNewGame());
        return;

    }
    fetch( configs.API_ORIGIN + "game/" + gameId)
        .then(function(res){ return res.json(); })
        .then(function(data){

            dispatch(resumeGameAction(_nextPlayer(data.player), data.moves, data.board));
            dispatch(checkWinner(data.board, data.player));

        }).catch(function () {
            showNotification("Network error! can't resume your game, let's play a fresh game!");
            dispatch(startNewGame());
    })
};

/**
 * Start a fresh game
 *
 * Post initial state to api and set game id into localstorage
 *
 * In case of any api failure, keep the play on offline.
 *
 * @returns {Function}
 */
const startNewGame = () => (dispatch) => {

    localStorage.removeItem('gameId');

    const initialData = {
        board : [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        moves : [],
        player : 1
    };

    fetch(configs.API_ORIGIN + "game",
        {
            method: "POST",
            body: JSON.stringify( initialData ) ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
            try {
                // set gameid for resume the game, if needed
                localStorage.setItem('gameId', data._id);
                // start the game
                dispatch(newGame());
            } catch {

                showNotification("Network error! can't save your game, but you can play it offline, enjoy !");
                dispatch(newGame());

            }
        }).catch(function () {
            showNotification("Network error! can't save your game, but you can play it offline, enjoy !");
            dispatch(newGame());
        })
};

const recordState = (board, player, moves) => () => {

    let gameId;
    try {
        gameId = localStorage.getItem('gameId');
    } catch {
        console.error('Unable to ready gameId from localstorage!')
    };
    const stateData = {
        board : board,
        moves : moves,
        player : player
    };

    fetch(configs.API_ORIGIN + "game/" + gameId,
        {
            method: "PUT",
            body: JSON.stringify( stateData ) ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
            //@todo check status code 200
            console.log('state data saved successfully');
        }).catch(function () {
            console.error("Unable to save state data through API : " + JSON.stringify( stateData ));
        })
};

export {
    startNewGame,
    startGame,
    checkWinner,
    playTurn,
    recordState
};