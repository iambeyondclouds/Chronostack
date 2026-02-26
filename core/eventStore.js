const fs = require("fs");
const path = require("path");

class EventStore {
  constructor() {
    this.filePath = path.join(__dirname, "../events.json");
    this.events = this.loadEvents();
  }

  loadEvents() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  saveEvents() {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.events, null, 2)
    );
  }

  append(event) {
    const newEvent = {
      id: this.events.length,
      timestamp: Date.now(),
      ...event,
    };

    this.events.push(newEvent);
    this.saveEvents();

    return newEvent;
  }

  getAll() {
    return this.events;
  }
}

module.exports = EventStore;