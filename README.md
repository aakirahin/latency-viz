# latency-viz

A real-time internet latency visualiser. A WebSocket client pings a local echo server every 500ms and plots the round-trip time (RTT) as a live rolling chart.

## Stack

| Layer | Tech |
|-------|------|
| Client | Vue 3, TypeScript, Vite, Pinia, Chart.js (via vue-chartjs), Tailwind CSS |
| Server | Node.js, `ws` |

## Project structure

```
latency-viz/
├── client/   # Vue 3 frontend
└── server/   # WebSocket echo server
```

## Getting started

### 1. Start the server

```bash
cd server
node server.js
```

Listens on `ws://localhost:8080`. Echoes every message back so the client can measure RTT.

### 2. Start the client

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`, enter the WebSocket URL, and click **Connect**.

## How it works

1. On connect, the client starts a ping loop (every 500 ms).
2. Each ping sends `{ timestamp: Date.now() }` to the server.
3. The server echoes the payload back unchanged.
4. On receipt, the client computes `RTT = Date.now() - timestamp` and adds it to the Pinia store.
5. The chart and stats bar reactively update — keeping the last 60 readings.

## Client scripts

```bash
npm run dev        # Dev server with hot reload
npm run build      # Type-check + production build
npm run preview    # Preview production build locally
npm run lint       # Run oxlint + ESLint with auto-fix
```
