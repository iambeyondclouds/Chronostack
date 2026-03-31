const EventStore = require("../core/eventStore");
const reducer = require("../core/reducer");
const StateEngine = require("../core/stateEngine");
const ReplayEngine = require("../core/replayEngine");

const store = new EventStore();
const stateEngine = new StateEngine(reducer, { count: 0 });
const replayEngine = new ReplayEngine(stateEngine);

// add events
store.append({ type: "INCREMENT" });
store.append({ type: "INCREMENT" });
store.append({ type: "DECREMENT" });

const events = store.getAll();

// get final state
const finalState = stateEngine.reconstruct(events);
console.log("Final State:", finalState);

// replay
const replayedState = replayEngine.replay(events);
console.log("Replayed State:", replayedState);

// timeline
const timeline = replayEngine.getReplayTimeline(events);
console.log("Timeline:", timeline);