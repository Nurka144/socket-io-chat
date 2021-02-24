import { io } from "socket.io-client";

const URL = "ws://localhost:3000";
const socket = io(URL, { autoConnect: false });


export default socket;