import express from 'express';
import io from 'socket.io';
var path = require('path');

const app = express();

const server = app.listen(8000, function () {
	console.log("Listening on port 8000");
});

const socketServer = io(server);

var clickCount = 0;

app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/html/index.html'));
});

socketServer.on('connection', function (client) {
	client.on('clicked', function (indicator) {
		clickCount++;
		socketServer.emit('buttonUpdate', clickCount);
	});
});