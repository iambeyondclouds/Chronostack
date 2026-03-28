const timeline = [
  { version: 1, count: 5 },
  { version: 2, count: 8 },
  { version: 3, count: 6 }
];

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ChronoStack Dashboard</h1>

      <h2 style={{ marginTop: "20px" }}>Final State</h2>
      <p>{timeline[timeline.length - 1].count}</p>

      <h2 style={{ marginTop: "20px" }}>Timeline</h2>
      <ul>
        {timeline.map(step => (
          <li key={step.version}>
            Version {step.version} → {step.count}
          </li>
        ))}
      </ul>

  
      <h2 style={{ marginTop: "20px" }}>State Diff</h2>
      <ul>
        {timeline.slice(1).map((step, i) => {
          const prev = timeline[i].count;
          const diff = step.count - prev;

          return (
            <li key={step.version}>
              Version {step.version}: {prev} → {step.count} (Δ {diff})
            </li>
          );
        })}
      </ul>

      <h2 style={{ marginTop: "20px" }}>Causality</h2>
      <ul>
        <li>Loading...</li>
      </ul>
    </div>
  );
}