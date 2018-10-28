// Actions
export const CLICK_ITEM = 'csv-lists/CLICK_ITEM';

// Init State
const initState = {};

// Reducer
export default function csvListsReducer(state = initState, action = {}) {
  switch (action.type) {
  default:
    return state;
  }
}

// Reducer Functions

// Action Creators
export function clickItem(item) {
  return {
    type: CLICK_ITEM,
    item,
  };
}
