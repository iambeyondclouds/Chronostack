const EventStore = require("../core/eventStore");
const StateEngine = require("../core/stateEngine");
const ReplayEngine = require("../core/replayEngine");

// simple reducer (just testing for now)
function reducer(state, event) {
  if (!state.count) state.count = 0;

  if (event.type === "ADD") {
    state.count += event.payload;
  } else if (event.type === "SUB") {
    state.count -= event.payload;
  }

  return state;
}

// creating instances
const store = new EventStore();
const stateEngine = new StateEngine(reducer, { count: 0 });
const replayEngine = new ReplayEngine(stateEngine);

// adding some events manually
const first = store.append({
  type: "ADD",
  payload: 5,
  workflowId: "wf1"
});

const second = store.append({
  type: "ADD",
  payload: 3,
  workflowId: "wf1",
  parentEventId: first.id
});

const third = store.append({
  type: "SUB",
  payload: 2,
  workflowId: "wf1",
  parentEventId: second.id
});

const events = store.getAll();

console.log("final state:");
console.log(replayEngine.replay(events));

console.log("\nchecking timeline...");
const timeline = replayEngine.getReplayTimeline(events);
console.log(timeline);

console.log("\nworkflow trace:");
console.log(store.getWorkflowTrace("wf1"));

console.log("\ncausality map:");
console.log(store.buildCausalityMap());

console.log("\ncausality tree:");
const tree = store.buildCausalityTree(first.id);
console.log(JSON.stringify(tree, null, 2));