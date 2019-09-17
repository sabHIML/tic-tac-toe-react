import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ player, gameover, moves, gameStatusMsg, freshGame }) => {

    return (
        <div>
            <h4>
                {gameover && gameStatusMsg}
                {!gameover && `Player: ${player}`}
            </h4>

            <button onClick={ () => freshGame() }>Start New Game</button>

            <ul>
                { moves.map((moveinfo, idx) => (
                        <li key={idx}>
                            player - {moveinfo.player} : [{moveinfo.row +1 } , {moveinfo.col + 1}]
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

const { arrayOf, number, bool, string, object, func } = PropTypes;

Info.propTypes = {
  player: number.isRequired,
  gameover: bool.isRequired,
  gameStatusMsg: string.isRequired,
  moves: arrayOf(arrayOf(object)).isRequired,
  freshGame: func.isRequired

};

export default Info;