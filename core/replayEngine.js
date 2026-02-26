function replay(events, reducer) {
  let state = { count: 0 };

  for (let event of events) {
    state = reducer(state, event);
  }

  return state;
}

module.exports = replay;