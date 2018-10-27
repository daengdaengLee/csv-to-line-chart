import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = ({ csvs: { allIds: list } }) => ({ list });

export default connect(mapStateToProps)(Presenter);
