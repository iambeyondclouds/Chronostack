class ReplayEngine {
  constructor(stateEngine) {
    this.stateEngine = stateEngine;
  }

  //  Replay all events → final state
  replay(events) {
    return this.stateEngine.reconstruct(events);
  }

  //  Replay till a specific version
  replayUntil(events, version) {
    const filteredEvents = events.filter(event => event.version <= version);
    return this.stateEngine.reconstruct(filteredEvents);
  }

  // Build timeline 
  getReplayTimeline(events) {
    let timeline = [];

    let state = { ...this.stateEngine.initialState };

    for (const event of events) {
      // apply event step-by-step safely
      state = this.stateEngine.reducer({ ...state }, event);

      // store snapshot (important!)
      timeline.push({
        version: event.version,
        state: { ...state }
      });
    }

    return timeline;
  }
}

module.exports = ReplayEngine;