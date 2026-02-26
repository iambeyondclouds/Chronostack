class StateEngine {
  constructor(reducer) {
    this.reducer = reducer;
    this.state = { count: 0 };
    this.history = [];
    this.version = 0;
  }

  apply(event) {
    this.state = this.reducer(this.state, event);

    this.history.push({
      version: this.version,
      state: { ...this.state },
      eventId: event.id,
    });

    this.version++;
  }

  getState() {
    return this.state;
  }

  getHistory() {
    return this.history;
  }

  getStateAtVersion(version) {
    return this.history.find(h => h.version === version);
  }
}

module.exports = StateEngine;