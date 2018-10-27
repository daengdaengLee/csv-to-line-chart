import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Presenter from './presenter';
import { init } from '../../../ducks/modules/csvs';

const mapStateToProps = ({ csvs: { allIds: list } }) => ({ list });

const mapDispatchToProps = dispatch => ({
  onInit: bindActionCreators(init, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
