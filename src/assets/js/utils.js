import _ from 'underscore';

export function _pipe(funcs) {
  const reversedFuncs = [...funcs].reverse();
  return _.compose(...reversedFuncs);
}

export function _go(val, ...funcs) {
  return _pipe(...funcs)(val);
}

export function _singleValueToArray(val) {
  return _.isArray(val) ? val : [val];
}

export function _refresh() {
  window.location.reload(true);
}
