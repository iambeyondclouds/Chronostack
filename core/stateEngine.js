class StateEngine {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.initialState = initialState;

    // new addition
    this.snapshot = initialState;
  }

  reconstruct(events) {
    let state = this.initialState;

    for (const event of events) {
      state = this.reducer(state, event);
    }

    // new addition
    this.snapshot = state;

    return state;
  }

  // new helper method
  getSnapshot() {
    return this.snapshot;
  }
}

module.exports = StateEngine;