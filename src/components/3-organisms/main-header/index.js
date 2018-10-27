import React, { Component } from 'react';

const STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  cursor: 'pointer',
};

class MainHeader extends Component {
  render() {
    const { _onClickTitle } = this;
    return (
      <h1 style={STYLE} onClick={_onClickTitle}>
        CSV to Line Chart
      </h1>
    );
  }

  _onClickTitle() {
    window.location.reload(true);
  }
}

export default MainHeader;
