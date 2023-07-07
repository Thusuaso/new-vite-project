import { io } from 'socket.io-client';

export const socket = {
  // socketIO: io('http://localhost:5001'),
  socketIO: io('https://doktor-socket.mekmar.com'),
    headers: {
    "Access-Control-Allow-Origin": "*",
  },
}
