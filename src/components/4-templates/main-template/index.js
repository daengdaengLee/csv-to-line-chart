import React from 'react';
import PropTypes from 'prop-types';

const MainTemplate = ({
  renderTop,
  renderBottom,
  renderCenterTop,
  renderCenterLeft,
  renderCenterCenter,
  renderCenterRight,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ height: '2rem' }}>{renderTop()}</div>
    <div style={{ height: '2rem' }}>{renderCenterTop()}</div>
    <div style={{ height: 0, flexGrow: 1, display: 'flex' }}>
      {renderCenterLeft()}
      <div style={{ width: 0, flexGrow: 1 }}>{renderCenterCenter()}</div>
      {renderCenterRight()}
    </div>
    <div style={{ height: '2rem' }}>{renderBottom()}</div>
  </div>
);

MainTemplate.defaultProps = {
  renderTop: () => null,
  renderBottom: () => null,
  renderCenterTop: () => null,
  renderCenterLeft: () => null,
  renderCenterCenter: () => null,
  renderCenterRight: () => null,
};

MainTemplate.propTypes = {
  renderTop: PropTypes.func,
  renderBottom: PropTypes.func,
  renderCenterTop: PropTypes.func,
  renderCenterLeft: PropTypes.func,
  renderCenterCenter: PropTypes.func,
  renderCenterRight: PropTypes.func,
};

export default MainTemplate;
