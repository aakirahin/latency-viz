const { WebSocketServer } = require('ws')

const PORT = 8080
const wss = new WebSocketServer({ port: PORT })

console.log(`WebSocket echo server running on ws://localhost:${PORT}`)

wss.on('connection', (ws, req) => {
    const client = req.socket.remoteAddress

    console.log(`[+] Client connected: ${client}`)

    ws.on('message', (msg) => ws.send(msg.toString())) // Convert Blob to string
    ws.on('close', () => console.log(`[-] Client disconnected: ${client}`))
    ws.on('error', (err) => console.error(`[!] Error from ${client}:`, err.message))
})