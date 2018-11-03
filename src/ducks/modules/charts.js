import _ from 'underscore';

// Actions
export const SETTING_START = 'charts/SETTING_START';
export const SETTING_END = 'charts/SETTING_END';
export const SET_SERIESES = 'charts/SET_SERIESES';
export const CLOSE = 'charts/CLOSE';

// Init State
const initState = {
  isOpen: false,
  isLoading: false,
  isError: false,
  allSeriesIds: [],
  seriesesById: {},
};

// Reducer
export default function chartsReducer(state = initState, action = {}) {
  switch (action.type) {
  case SETTING_START:
    return applySettingStart(state, action);
  case SETTING_END:
    return applySettingEnd(state, action);
  case SET_SERIESES:
    return applySetSerieses(state, action);
  case CLOSE:
    return applyClose(state, action);
  default:
    return state;
  }
}

// Reducer Functions
function applySettingStart(state) {
  return {
    ...state,
    isOpen: true,
    isLoading: true,
    isError: false,
  };
}

function applySettingEnd(state, { success }) {
  return {
    ...state,
    isOpen: true,
    isLoading: false,
    isError: !success,
  };
}

function applySetSerieses(state, { serieses }) {
  const allSeriesIds = _.map(serieses, _.property('id'));
  const seriesesById = _.indexBy(serieses, 'id');
  return {
    ...state,
    allSeriesIds,
    seriesesById,
  };
}

function applyClose(state) {
  return initState;
}

// Action Creators
export function settingStart() {
  return {
    type: SETTING_START,
  };
}

export function settingEnd(success) {
  return {
    type: SETTING_END,
    success,
  };
}

export function setSerieses(serieses) {
  return {
    type: SET_SERIESES,
    serieses,
  };
}
