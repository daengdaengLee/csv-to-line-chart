import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Presenter from './presenter';
import { uploadCsvFile, deleteCsvFile } from '../../../ducks/modules/csvs';

const mapStateToProps = ({ csvs: { currentId: currentCsv } }) => ({
  currentCsv,
});

const mapDispatchToProps = dispatch => ({
  onUploadCsvFile: bindActionCreators(uploadCsvFile, dispatch),
  onDeleteCsvFile: bindActionCreators(deleteCsvFile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
