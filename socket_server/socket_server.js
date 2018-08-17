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

io.on('connection', (socket) => {

    axios.get('http://localhost:8000/factory')
        .then((response) => {
            socket.emit('FromAPI', response.data);
        })
        .catch((error) => {
            io.emit('handleError', error.response.data);
        });

    socket.on('renameFactory', (data) => {
        axios.put(`http://localhost:8000/factory/${data.factoryId}`, {'name': data.name})
            .then((response) => {
                io.emit('renamedFactory', response.data);
            })
            .catch((error) => {
                socket.broadcast.emit('handleError', error.response.data);
            });
    });

    socket.on('generateNumbers', (data) => {
        axios.put(`http://localhost:8000/factory/${data.factoryId}`, 
            {'number_of_children': data.numberOfChildren, 'name': data.name})
            .then((response) => {
                io.emit('generatedNumbers', response.data);
            })
            .catch((error) => {
                io.emit('handleError', error.response.data);
            });
    });

    socket.on('deleteFactory', (data) => {
        axios.delete(`http://localhost:8000/factory/${data.factoryId}`)
            .catch((error) => {
                io.emit('handleError', error.response.data);
            });

        axios.get('http://localhost:8000/factory')
            .then((response) => {
                io.emit('FromAPI', response.data);
            })
            .catch((error) => {
                io.emit('handleError', error.response.data);
            });
    });

    socket.on('createFactory', (data) => {
        axios.post('http://localhost:8000/factory',
            {'number_of_children': data.numberOfChildren, 'name': data.name})
            .catch((error) => {
                io.emit('handleError', error.response.data);
            });

        axios.get('http://localhost:8000/factory')
            .then((response) => {
                io.emit('FromAPI', response.data);
            })
            .catch((error) => {
                io.emit('handleError', error.response.data);
            });
    });
});


server.listen(port, () => console.log(`Listening on port ${port}`));