const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder path
app.use(express.static(path.join(__dirname, 'public')));

const botName =  'DevChatties Bot'

//Run when client connect
io.on('connection', socket => {
    //Welcome connect user
    socket.emit('message', formatMessage(botName, 'Welcome to Dev Chatties!!'))

    //Brodcast when user connects
    socket.emit('message', formatMessage(botName, 'A user has joined the chat'));

    //Run when user disconnect
    socket.on('disconnect', () => {
        socket.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

    //Listen foe chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server Running in port ${PORT}`));