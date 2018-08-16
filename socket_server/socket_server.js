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

const generateNumbers = async (socket, data) => {
    const response = await axios.put(`http://localhost:8000/factory/${data.factoryId}`, 
        {'number_of_children': data.numberOfChildren, 'name': data.name});
    io.emit('generatedNumbers', response.data);
}

const deleteFactory = async (socket, data) => {
    const response = await axios.delete(`http://localhost:8000/factory/${data.factoryId}`);

    const refresh = await axios.get('http://localhost:8000/factory');
    io.emit('FromAPI', refresh.data);
}

const createFactory = async (socket, data) => {
    const response = await axios.post('http://localhost:8000/factory',
        {'number_of_children': data.numberOfChildren, 'name': data.name});
    const refresh = await axios.get('http://localhost:8000/factory');
    io.emit('FromAPI', refresh.data);
}

io.on('connection', (socket) => {
    console.log('New connection');

    getApiAndEmit(socket);

    socket.on('renameFactory', (socket, data) => {
        console.log('Renaming factory');
        renameFactory(socket, data);
    });

    socket.on('generateNumbers', (socket, data) => {
        console.log('Generating numbers');
        generateNumbers(socket, data);
    });

    socket.on('deleteFactory', (socket, data) => {
        console.log('Deleting factory');
        deleteFactory(socket, data);
    });

    socket.on('createFactory', (socket, data) => {
        console.log('Creating factory');
        createFactory(socket, data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected.')
    });
    
});


server.listen(port, () => console.log(`Listening on port ${port}`));