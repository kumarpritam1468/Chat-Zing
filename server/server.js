const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoute.js');
const messageRoute = require('./routes/messageRoute.js');
const usersRoute = require('./routes/usersRoute.js');

const connectMongoDB = require('./db/conn.js');
const { app, server } = require('./socket/socket.js');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', usersRoute);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

server.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server Running on PORT : ${PORT}`);
})