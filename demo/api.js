const http = require("http");
const EventStore = require("../core/eventStore");
const StateEngine = require("../core/stateEngine");
const ReplayEngine = require("../core/replayEngine");

// reducer
function reducer(state, event) {
  if (!state.count) state.count = 0;

  if (event.type === "ADD") {
    state.count += event.payload;
  } else if (event.type === "SUB") {
    state.count -= event.payload;
  }

  return state;
}

// setup
const store = new EventStore();
const stateEngine = new StateEngine(reducer, { count: 0 });
const replayEngine = new ReplayEngine(stateEngine);

// sample events
store.append({ type: "ADD", payload: 5, workflowId: "wf1" });
store.append({ type: "ADD", payload: 3, workflowId: "wf1" });
store.append({ type: "SUB", payload: 2, workflowId: "wf1" });

// server
const server = http.createServer((req, res) => {

  // ✅ EXISTING ROUTE
  if (req.url === "/data") {
    const events = store.getAll();
    const timeline = replayEngine.getReplayTimeline(events);
    const finalState = replayEngine.replay(events);

    const response = {
      finalState,
      timeline
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  }

  // ✅ NEW ROUTE (ADDED)
  else if (req.url.startsWith("/add")) {
    let type = "ADD";
    let payload = 1;

    // check if subtract
    if (req.url.includes("SUB")) {
      type = "SUB";
    }

    store.append({
      type,
      payload,
      workflowId: "wf1"
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Event added", type }));
  }
});

server.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});