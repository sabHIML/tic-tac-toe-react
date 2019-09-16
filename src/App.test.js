import reducer from './state/reducers/gameStatus';
import * as actions from './state/actions';

describe('Tic Tac Toe', () => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  describe('Reducers', () => {

    it('should start a new game', () => {
      // the current state 
      const state = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1,
        moves:[]
      };

      const expectedState = {
        board: emptyBoard.slice(),
        gameover: false,
        player: 1,
        winner: -1,
        moves:[]
      };

      const action = actions.newGame();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should end a game', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1,
        moves:[]
      };

      const expectedState = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1,
        moves:[]
      };

      const action = actions.gameover();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should update the board and track moves when a player makes a move', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1,
        moves:[]
      };

      const player = 1;
      const row = 2;
      const col = 2;

      const expectedState = {
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameover: false,
        player: 1,
        winner: -1,
        moves:[{player:player,col:col,row:row}]
      };

 

      const action = actions.movePlayer(player, row, col);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should win a game', () => {
      const winBoard = [
        [2, 2, 0],
        [1, 1, 1],
        [2, 2, 0]
      ];
      const state = {
        board: winBoard,
        gameover: false,
        player: 1,
        winner: -1,
        moves:[]
      };

      const expectedState = {
        board: winBoard,
        gameover: true,
        player: 1,
        winner: 1,
        moves:[]
      };

      const action = actions.winner(1);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    
  });
});