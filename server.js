const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder path
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connect
io.on('connection', socket => {
    //Welcome connect user
    socket.emit('message', 'Welcome to Dev Chatties!!')

    //Brodcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //Run when user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen foe chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server Running in port ${PORT}`));