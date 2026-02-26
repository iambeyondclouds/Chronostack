class EventStore {
  constructor() {
    this.events = [];
  }

  append(event) {
    const newEvent = {
      id: this.events.length,
      timestamp: Date.now(),
      ...event,
    };

    this.events.push(newEvent);
    return newEvent;
  }

  getAll() {
    return this.events;
  }
}

module.exports = EventStore;