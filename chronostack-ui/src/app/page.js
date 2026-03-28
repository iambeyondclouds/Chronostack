"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/data")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", lineHeight: "1.6" }}>
      <h1 style={{ marginBottom: "20px" }}>ChronoStack Dashboard</h1>

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

      {/*casuality*/} 
      <h2 style={{ marginTop: "20px" }}>Causality</h2>
      <ul>
        <li>Event 1 → Event 2</li>
        <li>Event 2 → Event 3</li>
      </ul>
    </div>
  );
}