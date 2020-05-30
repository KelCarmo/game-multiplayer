import http from "http";
import express from "express";
import socketio from 'socket.io';
import createGame from "./public/game.js";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const game = createGame();

app.use(express.static('public'));

sockets.on('connection', socket => {
  const playerId = socket.id;
  console.log('Client connected', playerId);

  socket.emit('setup', game.stateGame);
});

server.listen(3000, () => console.log("Server listening on the port: 3000"));