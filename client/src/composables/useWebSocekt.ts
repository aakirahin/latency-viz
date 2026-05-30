import { useLatencyStore } from "@/store/latency"
import { onUnmounted } from "vue"

// Composition API in practice
// Reusable logic, scoped to the component that calls it
export const useWebSocket = () => {
    const store = useLatencyStore()

    let ws: WebSocket | null = null
    let pingInterval: ReturnType<typeof setInterval> | null = null

    const connect = (url: string) => {
        if (ws) return

        store.status = 'connecting'
        ws = new WebSocket(url)

        ws.onopen = () => {
            store.status = 'connected'
            startPinging()
        }

        // Each message is the server echoing our ping back
        // We parse the timestamp we sent, subtract from now => RTT (Round-Trip Time)
        ws.onmessage = (event: MessageEvent) => {
            const { timestamp } = JSON.parse(event.data)
            const rtt = Date.now() - timestamp
            store.addReading(rtt)
        }

        ws.onclose = () => {
            store.status = 'disconnected'
            stopPinging()
            ws = null
        }

        ws.onerror = () => {
            store.status = 'disconnected'
            stopPinging()
            ws = null
        }
    }

    const disconnect = () => {
        stopPinging()
        ws?.close()
        ws = null
        store.reset()
    }

    // Ping loop
    // Every second: send { timestamp } to the server
    // The server echoes it back; onmessage calculates RTT
    const startPinging = (intervalMs = 500) => {
        pingInterval = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ timestamp: Date.now() }))
            }
        }, intervalMs)
    }

    const stopPinging = () => {
        if (pingInterval !== null) {
            clearInterval(pingInterval)
            pingInterval = null
        }
    }

    // Clean up if the component using this composable is destroyed
    onUnmounted(() => disconnect())

    return { connect, disconnect }
}