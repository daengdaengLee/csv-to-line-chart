import React from 'react';
import PropTypes from 'prop-types';

const CONTAINER_STYLE = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
};

const CSV_ID_STYLE = {
  margin: '0 6px',
};

const InfoBar = ({ currentCsv }) => (
  <div style={CONTAINER_STYLE}>
    <span style={CSV_ID_STYLE}>{currentCsv}</span>
  </div>
);

InfoBar.defaultProps = {
  currentCsv: '',
};

InfoBar.propTypes = {
  currentCsv: PropTypes.string,
};

export default InfoBar;
