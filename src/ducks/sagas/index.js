import { all } from 'redux-saga/effects';
import csvsSaga from './csvs';

export default function* rootSaga() {
  yield all([csvsSaga()]);
}
