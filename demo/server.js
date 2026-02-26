const EventStore = require("../core/eventStore");
const reducer = require("../core/reducer");
const StateEngine = require("../core/stateEngine");
const replay = require("../core/replayEngine");

const store = new EventStore();
const engine = new StateEngine(reducer);

// Emit events
store.append({ type: "INCREMENT" });
store.append({ type: "INCREMENT" });
store.append({ type: "DECREMENT" });

// Apply events
store.getAll().forEach(event => {
  engine.apply(event);
});

console.log("Current State:", engine.getState());

// Replay
const replayedState = replay(store.getAll(), reducer);
console.log("Replayed State:", replayedState);
console.log("State History:", engine.getHistory());

