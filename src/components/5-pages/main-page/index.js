import React from 'react';
import ChartViz from '../../3-organisms/chart-viz';
import CsvList from '../../3-organisms/csv-list';
import InfoBar from '../../3-organisms/info-bar';
import MainHeader from '../../3-organisms/main-header';
import MenuBar from '../../3-organisms/menu-bar';
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
    renderBottom={() => <InfoBar />}
    renderCenterTop={() => <MenuBar />}
    renderCenterCenter={() => <ChartViz />}
    renderCenterLeft={() => <CsvList />}
    renderCenterRight={mockup('silver', '10rem')}
  />
);

export default MainPage;
