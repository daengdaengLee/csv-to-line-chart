import { all } from 'redux-saga/effects';
import csvListsSaga from './csv-lists';

export default function* widgetsSaga() {
  yield all([csvListsSaga()]);
}
