import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Presenter from './presenter';
import { setCurrentId } from '../../../ducks/modules//csvs';

const mapStateToProps = ({ csvs: { allIds: list } }) => ({ list });

const mapDispatchToProps = dispatch => ({
  onClickItem: bindActionCreators(setCurrentId, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
