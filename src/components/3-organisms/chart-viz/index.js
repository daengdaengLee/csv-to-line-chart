import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = ({
  csvs: { currentId },
  charts: { isOpen, isLoading, isError, allSeriesIds, seriesesById },
}) => ({
  isOpen,
  isLoading,
  isError,
  currentId,
  allSeriesIds,
  seriesesById,
});

export default connect(mapStateToProps)(Presenter);
