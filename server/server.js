const express = require('express');
const app = express();
const dotenv = require('dotenv');

const connectMongoDB = require('./db/conn.js');
const authRoute = require('./routes/authRoute.js');

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server Running on PORT : ${PORT}`);
})