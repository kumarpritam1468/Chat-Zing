const {Server} = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST']
    }
});

const userSocketMap = {};

const getSocketReceiver = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection',(socket) => {
    // console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    // used to send events to all users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    
    socket.on('disconnect', () => {
        // console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

module.exports = {app, io, server, getSocketReceiver};