import _ from 'underscore';
import { _singleValueToArray, _go } from '../../assets/js/utils';

// Actions
export const SET_ALL_IDS = 'csvs/SET_ALL_IDS';
export const ADD_IDS = 'csvs/ADD_IDS';
export const REMOVE_IDS = 'csvs/REMOVE_IDS';

// Init State
const initState = {
  allIds: [],
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

// Action Creators
export function setAllIds(ids) {
  return {
    type: SET_ALL_IDS,
    ids,
  };
}

export function addIds(ids) {
  return {
    type: ADD_IDS,
    ids,
  };
}

export function removeIds(ids) {
  return {
    type: REMOVE_IDS,
    ids,
  };
}
