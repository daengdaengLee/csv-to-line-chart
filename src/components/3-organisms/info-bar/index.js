import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = ({ csvs: { currentId: currentCsv } }) => ({
  currentCsv,
});

export default connect(mapStateToProps)(Presenter);
