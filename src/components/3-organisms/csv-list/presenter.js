import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const _renderItem = item => <Item key={item}>{item}</Item>;

class CsvList extends Component {
  render() {
    const {
      props: { list },
    } = this;
    return <ul style={CONTAINER_STYLE}>{list.map(_renderItem)}</ul>;
  }

  componentDidMount() {
    this.props.onInit();
  }
}

CsvList.defaultProps = {
  list: [],
  onInit: () => {},
};

CsvList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  onInit: PropTypes.func,
};

export default CsvList;
