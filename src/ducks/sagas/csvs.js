import { all, take, call, put, select } from 'redux-saga/effects';
import _ from 'underscore';
import { _pipe } from '../../assets/js/utils';
import { INIT, setAllIds, UPLOAD_CSV_FILE, addIds } from '../modules/csvs';
import localforage from '../../localforage';

window.localforage = localforage;
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

function* updateCsvsToLocalforage(fileName) {
  let success;
  const oldCsvs = yield select(_pipe(_.property('csvs'), _.property('allIds')));
  const newCsvs = [...oldCsvs, fileName];
  try {
    yield call(_.bind(localforage.setItem, localforage, 'csvs', newCsvs));
    success = true;
  } catch (error) {
    console.error(error);
    success = false;
  }
  return success;
}

function getStringFromCsvFile(file) {
  if (!window.FileReader) return;
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = evt => {
      if (evt.target.readyState !== 2) rej();
      return res(evt.target.result);
    };
    reader.onerror = () => rej();
    reader.readAsText(file);
  });
}

function* setCsvToLocalforage(name, csvAsString) {
  let success;
  try {
    yield call(_.bind(localforage.setItem, localforage, name, csvAsString));
    success = true;
  } catch (error) {
    console.error(error);
    success = false;
  }
  return success;
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
    success = yield success && call(updateCsvsToLocalforage, fileName);
    yield success && put(addIds(fileName));
  }
}

export default function* csvsSaga() {
  yield all([watchInit(), watchUploadCsvFile()]);
}
