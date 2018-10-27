import React from 'react';

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

const MenuBar = () => (
  <div style={CONTAINER_STYLE}>
    <div style={MENU_STYLE}>open</div>
    <div style={MENU_STYLE}>delete</div>
  </div>
);

export default MenuBar;
