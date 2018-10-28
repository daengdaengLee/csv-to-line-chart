import _ from 'underscore';
import { _singleValueToArray, _go } from '../../assets/js/utils';

// Actions
export const INIT = 'csvs/INIT';
export const SET_ALL_IDS = 'csvs/SET_ALL_IDS';
export const UPLOAD_CSV_FILE = 'csvs/UPLOAD_CSV_FILE';
export const ADD_IDS = 'csvs/ADD_IDS';
export const DELETE_CSV_FILE = 'csvs/DELETE_CSV_FILE';
export const REMOVE_IDS = 'csvs/REMOVE_IDS';
export const SET_CURRENT_ID = 'csvs/SET_CURRENT_ID';

// Init State
const initState = {
  allIds: [],
  currentId: '',
};

// Reducer
export default function csvsReducer(state = initState, action = {}) {
  switch (action.type) {
  case SET_ALL_IDS:
    return applySetAllIds(state, action);
  case ADD_IDS:
    return applyAddIds(state, action);
  case REMOVE_IDS:
    return applyRemoveIds(state, action);
  case SET_CURRENT_ID:
    return applySetCurrentId(state, action);
  default:
    return state;
  }
}

// Reducer Functions
function applySetAllIds(state, { ids }) {
  return {
    ...state,
    allIds: ids,
  };
}

function applyAddIds(state, { ids }) {
  return {
    ...state,
    allIds: _go(ids, _singleValueToArray, _.partial(_.union, state.allIds)),
  };
}

function applyRemoveIds(state, { ids }) {
  return {
    ...state,
    allIds: _go(
      ids,
      _singleValueToArray,
      _.partial(_.difference, state.allIds, _),
    ),
  };
}

function applySetCurrentId(state, { id }) {
  return {
    ...state,
    currentId: id,
  };
}

// Action Creators
export function init() {
  return {
    type: INIT,
  };
}

export function setAllIds(ids) {
  return {
    type: SET_ALL_IDS,
    ids,
  };
}

export function uploadCsvFile(file) {
  return {
    type: UPLOAD_CSV_FILE,
    file,
  };
}

export function addIds(ids) {
  return {
    type: ADD_IDS,
    ids,
  };
}

export function deleteCsvFile(id) {
  return {
    type: DELETE_CSV_FILE,
    id,
  };
}

export function removeIds(ids) {
  return {
    type: REMOVE_IDS,
    ids,
  };
}

export function setCurrentId(id) {
  return {
    type: SET_CURRENT_ID,
    id,
  };
}
