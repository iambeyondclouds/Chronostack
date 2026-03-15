class ReplayEngine {
  constructor(stateEngine) {
    this.stateEngine = stateEngine;
  }

  replay(events) {
    return this.stateEngine.reconstruct(events);
  }

  replayUntil(events, version) {
    const filteredEvents = events.filter(event => event.version <= version);
    return this.stateEngine.reconstruct(filteredEvents);
  }

  getReplayTimeline(events) {
    let timeline = [];
    let state = this.stateEngine.initialState;

    for (const event of events) {
      state = this.stateEngine.reducer(state, event);

      timeline.push({
        version: event.version,
        state: state
      });
    }

    return timeline;
  }
}

module.exports = ReplayEngine;