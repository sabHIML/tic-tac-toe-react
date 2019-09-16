import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ player, gameover, moves, gameStatusMsg }) => {

    return (
        <div>
            <h4>
                {gameover && gameStatusMsg}
                {!gameover && `Player: ${player}`}
            </h4>

            <ul>
                { moves.map((moveinfo, idx) => (
                        <li key={idx}>
                            player - {moveinfo.player} : [{moveinfo.row} , {moveinfo.col}]
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

const { arrayOf, number, bool, string, object } = PropTypes;

Info.propTypes = {
  player: number.isRequired,
  gameover: bool.isRequired,
  gameStatusMsg: string.isRequired,
  moves: arrayOf(arrayOf(object)).isRequired
};

export default Info;