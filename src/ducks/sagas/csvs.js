import { all, take, call, put, select, fork } from 'redux-saga/effects';
import _ from 'underscore';
import { _pipe, _singleValueToArray } from '../../assets/js/utils';
import {
  INIT,
  UPLOAD_CSV_FILE,
  DELETE_CSV_FILE,
  REMOVE_IDS,
  setAllIds,
  addIds,
  removeIds,
  setCurrentId,
} from '../modules/csvs';
import localforage from '../../localforage';

// Workers
function* getCsvsFromLocalforage() {
  let csvs;
  let ok = false;
  let count = 0;
  while (!ok) {
    try {
      csvs = yield call(_.bind(localforage.getItem, localforage, 'csvs'));
      ok = true;
    } catch (error) {
      console.error(error);
      count++;
      ok = count > 2;
    }
  }
  return csvs;
}

function* addCsvsToLocalforage(keys) {
  let success;
  let ok = false;
  let count = 0;
  while (!ok) {
    try {
      const oldCsvs = yield select(
        _pipe(_.property('csvs'), _.property('allIds')),
      );
      const newCsvs = yield call(_.bind(Array.prototype.concat, oldCsvs, keys));
      yield call(_.bind(localforage.setItem, localforage, 'csvs', newCsvs));
      success = true;
      ok = true;
    } catch (error) {
      console.error(error);
      success = false;
      count++;
      ok = count > 2;
    }
  }
  return success;
}

function* removeCsvsFromLocalforage(keys) {
  let success;
  let ok = false;
  let count = 0;
  while (!ok) {
    try {
      const oldCsvs = yield select(
        _pipe(_.property('csvs'), _.property('allIds')),
      );
      const newCsvs = yield call(
        _.difference,
        oldCsvs,
        _singleValueToArray(keys),
      );
      yield call(_.bind(localforage.setItem, localforage, 'csvs', newCsvs));
      success = true;
      ok = true;
    } catch (error) {
      console.error(error);
      success = false;
      count++;
      ok = count > 2;
    }
  }
  return success;
}

function getStringFromCsvFile(key) {
  if (!window.FileReader)
    return new Promise((_, rej) => {
      console.error('no FileReader API');
      rej(undefined);
    });
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = evt => {
      if (evt.target.readyState !== 2) {
        console.error('FileReader state is not ok');
        rej(undefined);
      }
      return res(evt.target.result);
    };
    reader.onerror = error => {
      console.error(error);
      rej(undefined);
    };
    reader.readAsText(key);
  });
}

function* setCsvToLocalforage(key, csvAsString) {
  let success;
  let ok = false;
  let count = 0;
  while (!ok) {
    try {
      yield call(_.bind(localforage.setItem, localforage, key, csvAsString));
      success = true;
      ok = true;
    } catch (error) {
      console.error(error);
      success = false;
      count++;
      ok = count > 2;
    }
  }
  return success;
}

function* unsetCsvFromLocalforage(key) {
  let success;
  let ok = false;
  let count = 0;
  while (!ok) {
    try {
      yield call(_.bind(localforage.removeItem, localforage, key));
      success = true;
      ok = true;
    } catch (error) {
      console.error(error);
      success = false;
      count++;
      ok = count > 2;
    }
  }
  return success;
}

function* getCurrentCsv() {
  const current = yield select(
    _pipe(_.property('csvs'), _.property('currentId')),
  );
  return current;
}

// Watchers
function* watchInit() {
  while (true) {
    yield take(INIT);
    const csvs = yield call(getCsvsFromLocalforage);
    yield put(setAllIds(_.toArray(csvs)));
  }
}

function* watchUploadCsvFile() {
  while (true) {
    const action = yield take(UPLOAD_CSV_FILE);
    const { name: fileName } = action.file;
    const csvAsString = yield call(getStringFromCsvFile, action.file);
    let success = yield call(setCsvToLocalforage, fileName, csvAsString);
    success = yield success && call(addCsvsToLocalforage, fileName);
    yield success && put(addIds(fileName));
  }
}

function* watchDeleteCsvFile() {
  while (true) {
    const { id } = yield take(DELETE_CSV_FILE);
    let success = yield call(unsetCsvFromLocalforage, id);
    success = yield success && call(removeCsvsFromLocalforage, id);
    yield success && put(removeIds(id));
  }
}

function* watchRemoveIds() {
  while (true) {
    const { ids } = yield take(REMOVE_IDS);
    yield fork(function*() {
      const current = yield call(getCurrentCsv);
      const isRemoveCurrentCsv = _.isArray(ids)
        ? _.contains(ids, current)
        : ids === current;
      yield isRemoveCurrentCsv && put(setCurrentId(''));
    });
  }
}

export default function* csvsSaga() {
  yield all([
    watchInit(),
    watchUploadCsvFile(),
    watchDeleteCsvFile(),
    watchRemoveIds(),
  ]);
}
