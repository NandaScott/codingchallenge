import express from 'express';
import io from 'socket.io';

const app = express();

const server = app.listen(8000, function () {
	console.log("Listening on port 8000");
});

const socketServer = io(server);

socketServer.on('connection', function (client) {
	client.on('updates', function (payload) {
		console.log('The human eye can\'t see more than 30 fps', payload);
		client.emit('response', 'Pong');
	});
});