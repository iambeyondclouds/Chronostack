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
}

module.exports = ReplayEngine;