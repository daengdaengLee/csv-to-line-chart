import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const INPUT_STYLE = {
  display: 'none',
};

class InputFile extends Component {
  constructor(props) {
    super(props);
    this._fileInput = React.createRef();
    this._triggerClickFileInput = this._triggerClickFileInput.bind(this);
  }

  render() {
    const {
      _fileInput,
      _triggerClickFileInput,
      props: { renderDisplay, onChange },
    } = this;
    return (
      <Fragment>
        {renderDisplay(_triggerClickFileInput)}
        <input
          type="file"
          ref={_fileInput}
          onChange={onChange}
          style={INPUT_STYLE}
        />
      </Fragment>
    );
  }

  _triggerClickFileInput() {
    const { _fileInput } = this;
    _fileInput.current.click();
  }
}

InputFile.defaultProps = {
  renderDisplay: clickTrigger => null,
  onChange: event => {},
};

InputFile.propTypes = {
  renderDisplay: PropTypes.func,
  onChange: PropTypes.func,
};

export default InputFile;
