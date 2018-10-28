import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Presenter from './presenter';
import { clickItem } from '../../../ducks/modules/widgets/csv-lists';

const mapStateToProps = ({ csvs: { allIds: list } }) => ({ list });

const mapDispatchToProps = dispatch => ({
  onClickItem: bindActionCreators(clickItem, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
