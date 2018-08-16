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

const getApiAndEmit = async (socket) => {
    const response = await axios.get('http://localhost:8000/factory');
    socket.emit('FromAPI', response.data);
};

const renameFactory = async (socket, data) => {
    const response = await axios.put(`http://localhost:8000/factory/${data.factoryId}`, {'name': data.name});
    io.emit('renamedFactory', response.data);
}

io.on('connection', (socket) => {
    console.log('New connection');

    getApiAndEmit(socket);

    socket.on('renameFactory', (socket, data) => {
        console.log('Renaming factory');
        renameFactory(socket, data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected.')
    })
    
});


server.listen(port, () => console.log(`Listening on port ${port}`));