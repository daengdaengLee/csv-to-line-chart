import React from 'react';
import MainHeader from '../../3-organisms/main-header';
import MainTemplate from '../../4-templates/main-template';

const mockup = (color, width, height) => () => (
  <div
    style={{
      width: width || '100%',
      height: height || '100%',
      backgroundColor: color,
    }}
  />
);

const MainPage = () => (
  <MainTemplate
    renderTop={() => <MainHeader />}
    renderBottom={mockup('blue')}
    renderCenterTop={mockup('yellow')}
    renderCenterCenter={mockup('skyblue')}
    renderCenterLeft={mockup('silver', '10rem')}
    renderCenterRight={mockup('silver', '10rem')}
  />
);

export default MainPage;
