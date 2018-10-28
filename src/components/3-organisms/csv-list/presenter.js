import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import styled from 'styled-components';

const CONTAINER_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px',
};

const Item = styled.li`
  height: 26px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  cursor: pointer;
  &:hover {
    background-color: skyblue;
  }
`;

class CsvList extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  render() {
    const {
      _renderItem,
      props: { list },
    } = this;
    return <ul style={CONTAINER_STYLE}>{list.map(_renderItem)}</ul>;
  }

  _renderItem(item) {
    const { onClickItem } = this.props;
    return (
      <Item key={item} onClick={_.partial(onClickItem, item)}>
        {item}
      </Item>
    );
  }
}

CsvList.defaultProps = {
  list: [],
  onClickItem: item => {},
};

CsvList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  onClickItem: PropTypes.func,
};

export default CsvList;
