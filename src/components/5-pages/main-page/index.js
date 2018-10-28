import React from 'react';
import CsvList from '../../3-organisms/csv-list';
import InfoBar from '../../3-organisms/info-bar';
import MainHeader from '../../3-organisms/main-header';
import MenuBar from '../../3-organisms/menu-bar';
import MainTemplate from '../../4-templates/main-template';

const MOCKUP_CSV_LIST = ['csv1', 'csv2', 'csv3'];

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
    renderCenterCenter={mockup('skyblue')}
    renderCenterLeft={() => <CsvList list={MOCKUP_CSV_LIST} />}
    renderCenterRight={mockup('silver', '10rem')}
  />
);

export default MainPage;
