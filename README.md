# ChronoStack

ChronoStack is an event-driven system that stores state changes as events instead of storing the final state directly.

The idea is simple: instead of updating state, we record what happened, and rebuild state whenever needed.

---

## Overview

Most applications store only the latest state. Once state changes, previous values are lost.

ChronoStack takes a different approach:

- Every change is stored as an event
- Events are appended (never deleted)
- State is reconstructed by replaying events
- Any past state can be rebuilt

This makes the system predictable and easier to debug.

---

## Problem

In real-world applications:

- State changes are hard to track
- Debugging async behavior is difficult
- Logs don’t give full history
- Bugs are hard to reproduce

ChronoStack tries to solve this by keeping a complete history of state changes.

---

## How it works

Each action creates an event.

Example:
ADD +5 ADD +3 SUB -2

Instead of storing `6`, we store all these events.

To get the state, we replay them step by step.

---

## Features

- Event store (append-only)
- Replay engine (rebuilds state)
- Reducer-based state updates
- Timeline of versions
- State difference between steps
- Replay to any version (time travel)
- Simple UI to interact with system

---

## Demo

Start with initial events:
Version 1 → 5 Version 2 → 8 Version 3 → 6

### Add +1

Creates a new event:
Version 4 → 7

### Subtract -1
Version 5 → 6

### Replay

Enter a version (e.g. 2):
State at version 2 → 8

---

## Tech Stack

- Frontend: Next.js
- Backend: Node.js
- Architecture: Event sourcing

---

## Project Structure
chronostack/ ├── core/ ├── demo/ ├── chronostack-ui/ └── README.md

---

## How to run

Start backend:
node demo/api.js

Start frontend:
cd chronostack-ui npm install npm run dev

Open:
http://localhost:3000⁠

---

## Key idea

Store events, not state.

State can always be rebuilt from events.

---

## Future improvements

- Persistent storage (DB)
- Better visualization
- Multi-user workflows

---

## Note

This is a prototype built for understanding event-driven systems and replay-based debugging.

---

## License

MIT