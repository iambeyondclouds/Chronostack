class StateEngine {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.initialState = initialState;
  }

  reconstruct(events) {
    let state = this.initialState;

    for (const event of events) {
      state = this.reducer(state, event);
    }

    return state;
  }
}

module.exports = StateEngine;