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

  //  FUNCTION 
  const replayToVersion = () => {
    if (!data) return;

    const v = parseInt(version);

    const filtered = data.timeline.filter(step => step.version <= v);

    if (filtered.length > 0) {
      const last = filtered[filtered.length - 1];
      setReplayState(last.state.count);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", lineHeight: "1.6" }}>
      <h1 style={{ marginBottom: "20px" }}>ChronoStack Dashboard</h1>

      {/* Controls */}
      <h2>Controls</h2>
      <button
        onClick={() => addEvent("ADD")}
        style={{
          padding: "8px 12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Add +1
      </button>

      <button
        onClick={() => addEvent("SUB")}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Subtract -1
      </button>

      {/* Replay Section */}
      <h2 style={{ marginTop: "20px" }}>Replay (Time Travel)</h2>

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

      <p>
        {replayState !== null
          ? `State at version ${version}: ${replayState}`
          : ""}
      </p>

      {/* Final State */}
      <h2 style={{ marginTop: "20px" }}>Final State</h2>
      <p>{data ? data.finalState.count : "Loading..."}</p>

      {/* Timeline */}
      <h2 style={{ marginTop: "20px" }}>Timeline</h2>
      <ul>
        {data
          ? data.timeline.map(step => (
              <li key={step.version}>
                Version {step.version} {"->"} {step.state.count}
              </li>
            ))
          : "Loading..."}
      </ul>

      {/* State Diff */}
      <h2 style={{ marginTop: "20px" }}>State Diff</h2>
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

      {/* Causality */}
      <h2 style={{ marginTop: "20px" }}>Causality</h2>
      <ul>
        <li>Event 1 → Event 2</li>
        <li>Event 2 → Event 3</li>
      </ul>
    </div>
  );
}