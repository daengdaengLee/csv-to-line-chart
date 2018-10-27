import React from 'react';
import { _refresh } from '../../../assets/js/utils';

const STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  cursor: 'pointer',
};

const MainHeader = () => (
  <h1 style={STYLE} onClick={_refresh}>
    CSV to Line Chart
  </h1>
);

export default MainHeader;
