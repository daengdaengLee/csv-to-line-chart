import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Presenter from './presenter';
import { uploadCsvFile } from '../../../ducks/modules/csvs';

const mapDispatchToProps = dispatch => ({
  onUploadCsvFile: bindActionCreators(uploadCsvFile, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Presenter);
