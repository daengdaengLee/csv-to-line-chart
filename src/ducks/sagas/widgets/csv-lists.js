import { all, take, put } from 'redux-saga/effects';
import { CLICK_ITEM } from '../../modules/widgets/csv-lists';
import { setCurrentId } from '../../modules/csvs';

// Watchers
function* watchClickItem() {
  while (true) {
    const action = yield take(CLICK_ITEM);
    yield put(setCurrentId(action.item));
  }
}

export default function* csvListsSaga() {
  yield all([watchClickItem()]);
}
