const express = require('express');
const socketIo = require('socket.io');
const axios = require('axios');

const index = require('./routes/index');
const app = express();

app.use(index);

const port = process.env.PORT || 4001;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const io = socketIo(server);

const getApiAndEmit = async socket => {
    const response = await axios.get('http://localhost:8000/factory');
    console.log('Emitting', response);
    socket.emit('FromAPI', response.data);
};

io.on('connection', socket => {
    console.log('New connection');
    return getApiAndEmit(socket);
    socket.on('disconnect', () => {
        console.log('Disconnected.')
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));