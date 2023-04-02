import { io } from "socket.io-client"



// https://social-media-socket-8r6n.onrender.com

const socket = io('http://192.168.1.8:5000',{
    debug:false,
});

export default socket;