import React from 'react';
import PropTypes from 'prop-types';

/**
 * show X or O into board box.
 * @param player
 * @returns {string}
 */
const playerIcon = player => {
  switch (player) {
    case 1:
      return 'X';
    case 2:
      return 'O';
    default:
      return '';
  }
};

const Box = player => {
  return (
    <div>{playerIcon(player.player)}</div>
  );
};

const { number } = PropTypes;

Box.propTypes = {
  player: number.isRequired
};

export default Box;