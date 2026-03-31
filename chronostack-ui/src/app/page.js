"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [version, setVersion] = useState("");
  const [replayState, setReplayState] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/data")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const addEvent = (type) => {
    fetch(`http://localhost:4000/add?type=${type}`)
      .then(() => fetch("http://localhost:4000/data"))
      .then(res => res.json())
      .then(data => setData(data));
  };

  //  REPLAY FUNCTION
  const replayToVersion = () => {
    if (!data || !version) return;

    const v = parseInt(version);

    const match = data.timeline.find(step => step.version === v);

    if (match) {
      setReplayState(match.state.count);
    } else {
      setReplayState("No such version");
    }
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "20px"
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>ChronoStack Dashboard</h1>

      {/* Controls */}
      <div style={cardStyle}>
        <h2>Controls</h2>
        <button
          onClick={() => addEvent("ADD")}
          style={{ padding: "8px 12px", background: "green", color: "white", border: "none", borderRadius: "5px" }}
        >
          Add +1
        </button>

        <button
          onClick={() => addEvent("SUB")}
          style={{ marginLeft: "10px", padding: "8px 12px", background: "red", color: "white", border: "none", borderRadius: "5px" }}
        >
          Subtract -1
        </button>
      </div>

      {/* Replay */}
      <div style={cardStyle}>
        <h2>Replay (Time Travel)</h2>
        <input
          type="number"
          placeholder="Enter version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          style={{ padding: "5px" }}
        />

        <button onClick={replayToVersion} style={{ marginLeft: "10px" }}>
          Replay
        </button>

        {/* OUTPUT */}
        <p>
          {replayState !== null
            ? typeof replayState === "number"
              ? `State at version ${version}: ${replayState}`
              : replayState
            : ""}
        </p>
      </div>

      {/* Final State */}
      <div style={cardStyle}>
        <h2>Final State</h2>
        <p>{data ? data.finalState.count : "Loading..."}</p>
      </div>

      {/* Timeline */}
      <div style={cardStyle}>
        <h2>Timeline</h2>
        <ul>
          {data
            ? data.timeline.map(step => (
                <li key={step.version}>
                  Version {step.version} {"->"} {step.state.count}
                </li>
              ))
            : "Loading..."}
        </ul>
      </div>

      {/* State Diff */}
      <div style={cardStyle}>
        <h2>State Diff</h2>
        <ul>
          {data &&
            data.timeline.slice(1).map((step, i) => {
              const prev = data.timeline[i].state.count;
              const diff = step.state.count - prev;

              return (
                <li key={step.version}>
                  Version {step.version}: {prev} {"->"} {step.state.count} (Δ {diff})
                </li>
              );
            })}
        </ul>
      </div>

      {/* Causality */}
      <div style={cardStyle}>
        <h2>Causality</h2>
        <ul>
          <li>Event 1 → Event 2</li>
          <li>Event 2 → Event 3</li>
        </ul>
      </div>
    </div>
  );
}