# ChronoStack

Deterministic Event Runtime & Time-Travel Debugger for Web Applications.

---

## Overview

ChronoStack is an experimental runtime layer designed to improve reproducibility and debugging in modern web systems.

Instead of directly mutating application state, ChronoStack:

- Records every action as an immutable event
- Stores events in an append-only log
- Derives state deterministically from events
- Maintains versioned state history
- Enables replay and time-travel debugging

This project focuses on infrastructure-level developer tooling.

---

## Problem

Modern web applications are asynchronous and event-driven.

User actions trigger chains of:
- API calls
- Database mutations
- Background jobs
- Real-time updates

When bugs occur:
- Execution order becomes unclear
- State mutation history is lost
- Reproducing failures is difficult
- Logs do not capture full causality

ChronoStack aims to provide deterministic execution tracking and replayability to address this problem.

---

## Core Concepts

1. **Event-Driven Architecture**
   All state transitions occur via events.

2. **Immutability**
   State is derived from events and never directly mutated.

3. **Determinism**
   Given the same event sequence, the system reconstructs the same state.

4. **Replayability**
   The system can rebuild state from the event log at any point in time.

---

## Current Implementation (Prototype)

- Append-only in-memory event store
- Reducer-based state engine
- Versioned state history tracking
- Deterministic replay engine

---

## Roadmap (March Development Plan)

Week 1:
- Strengthen event store
- Improve snapshot system

Week 2:
- Add deterministic replay improvements
- Introduce async workflow tracking

Week 3:
- Implement event causality graph
- Add execution metadata

Week 4:
- Build visual debugging dashboard
- Add timeline and state diff viewer

---

## Future Scope

- Persistent event storage
- Multi-service integration
- Plugin architecture
- npm SDK packaging
- Distributed mode support

---

## License

MIT License
## Getting Started

Clone the repository:

```
git clone https://github.com/iambeyondclouds/chronostack.git
cd chronostack
```

Install dependencies:

```
npm install
```

Run demo:

```
node demo/server.js
```

---

## Project Structure

```
chronostack/
 ├── core/          # Runtime engine modules
 ├── demo/          # Example usage
 ├── docs/          # Architecture documentation
 ├── package.json
 └── README.md
```

---

## Example Output

```
Current State: { count: 1 }
Replayed State: { count: 1 }
State History: [...]
```