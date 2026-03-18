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
      parentEventId: event.parentEventId || null,
      timestamp: new Date().toISOString(),
      version: ++this.version
    };

    this.events.push(newEvent);
    return newEvent;
  }

  getAll() {
    return this.events;
  }

  groupByWorkflow() {
    const workflows = {};

    for (const event of this.events) {
      const workflowId = event.workflowId || "default";

      if (!workflows[workflowId]) {
        workflows[workflowId] = [];
      }

      workflows[workflowId].push(event);
    }

    return workflows;
  }
  getWorkflowTrace(workflowId) {
  return this.events
    .filter(event => event.workflowId === workflowId)
    .sort((a, b) => a.version - b.version);
}
}

module.exports = EventStore;