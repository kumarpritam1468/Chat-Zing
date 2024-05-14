const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectMongoDB = require('./db/conn.js');
const authRoute = require('./routes/authRoute.js');
const messageRoute = require('./routes/messageRoute.js');

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server Running on PORT : ${PORT}`);
})