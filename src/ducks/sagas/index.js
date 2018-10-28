import { all } from 'redux-saga/effects';
import widgetsSaga from './widgets';
import csvsSaga from './csvs';

export default function* rootSaga() {
  yield all([widgetsSaga(), csvsSaga()]);
}
