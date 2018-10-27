import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputFile from '../../2-molecules/input-file';

const CONTAINER_STYLE = {
  display: 'flex',
  height: '100%',
};

const MENU_STYLE = {
  width: '100px',
  boxSizing: 'border-box',
  border: '1px solid black',
  margin: '0 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
};

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this._onChangeFileInput = this._onChangeFileInput.bind(this);
  }

  render() {
    const { _onChangeFileInput } = this;
    return (
      <div style={CONTAINER_STYLE}>
        <InputFile
          renderDisplay={clickTrigger => (
            <div style={MENU_STYLE} onClick={clickTrigger}>
              open
            </div>
          )}
          onChange={_onChangeFileInput}
        />
        <div style={MENU_STYLE}>delete</div>
      </div>
    );
  }

  _onChangeFileInput(event) {
    const { onUploadCsvFile } = this.props;
    onUploadCsvFile(event.target.files[0]);
  }
}

MenuBar.defaultProps = {
  onUploadCsvFile: file => {},
};

MenuBar.propTypes = {
  onUploadCsvFile: PropTypes.func,
};

export default MenuBar;
