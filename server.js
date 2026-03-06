import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({url: "wss://ws.ifelse.io"});

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on wss://ws.ifelse.io");