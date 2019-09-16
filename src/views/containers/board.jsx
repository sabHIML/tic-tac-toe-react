import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { gameOperations } from '../../state/reducers/reducers';
import Box from '../components/box';
import Info from '../components/info';

class Board extends Component {
  constructor(props, context) {
    super(props, context);

    this.boxClicked = this.boxClicked.bind(this);
  }

    /**
     *
     * @param clickedBox
     */
  boxClicked(clickedBox) {

    const { board, player, gameover, playTurn, checkWinner } = this.props;
    const { row, col } = clickedBox;

    // validation : only mark if the game is still in progress and the box is empty
    if (gameover || board[row][col] !== 0) {
      return;
    }

    // make a play for the player
    playTurn(player, row, col);
    // then check for a winner
    checkWinner(board, player);
  }

  render() {
    const { board, winner, player, gameover, moves } = this.props;
    const gameStatusMsg = winner === 0 ? 'Draw!' : `Player - ${winner} wins!`;
    
    return (
        <div id='container'>

            <div id='board'>
                {board.map((row, rIdx) => (

                    row.map((col, cIdx) => {
                        return (
                            <div key={cIdx} className='box'
                                onClick = { () => this.boxClicked({ row: rIdx, col: cIdx })}
                                >
                                <Box player = {col} />
                            </div>
                        );
                    })

                ))}
            </div>

            <Info gameStatusMsg={gameStatusMsg} player={player}
            gameover={gameover} moves={moves}/>

        </div>
        
    );
  }
}

const { arrayOf, number, func, bool, object } = PropTypes;
Board.propTypes = {
  board: arrayOf(arrayOf(number)).isRequired,
  player: number.isRequired,
  gameover: bool.isRequired,
  playTurn: func.isRequired,
  checkWinner: func.isRequired,
  winner: number.isRequired,
  moves: arrayOf(arrayOf(object)).isRequired
};

const mapStateToProps = (state) => {
  const { gameState } = state;

  return {
    board: gameState.board,
    player: gameState.player,
    gameover: gameState.gameover,
    winner: gameState.winner,
    moves: gameState.moves
  };
};

const mapDispatchToProps = {
  playTurn: gameOperations.playTurn,
  checkWinner: gameOperations.checkWinner
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);