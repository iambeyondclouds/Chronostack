const fs = require("fs");
const path = require("path");

class EventStore {
  constructor() {
    this.events = [];
    this.version = 0;
  }

  append(event) {
    const newEvent = {
      id: Date.now(),
      type: event.type,
      payload: event.payload,
      workflowId: event.workflowId || null,
      timestamp: new Date().toISOString(),
      version: ++this.version
    };

    this.events.push(newEvent);
    return newEvent;
  }

  getAll() {
    return this.events;
  }
}

module.exports = EventStore;