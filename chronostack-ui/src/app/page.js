const timeline = [
  { version: 1, count: 5 },
  { version: 2, count: 8 },
  { version: 3, count: 6 }
];

export default function Home() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial", lineHeight: "1.6" }}>
      <h1 style={{ marginBottom: "20px" }}>ChronoStack Dashboard</h1>

      <h2 style={{ marginTop: "20px" }}>Final State</h2>
      <p>{timeline[timeline.length - 1].count}</p>

      <h2 style={{ marginTop: "20px" }}>Timeline</h2>
      <ul>
        {timeline.map(step => (
          <li key={step.version}>
            Version {step.version} {"->"} {step.count}
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
              Version {step.version}: {prev} {"->"} {step.count} (Δ {diff})
            </li>
          );
        })}
      </ul>

      <h2 style={{ marginTop: "20px" }}>Causality</h2>
<ul>
  <li>Event 1 → Event 2</li>
  <li>Event 2 → Event 3</li>
</ul>
    </div>
  );
}