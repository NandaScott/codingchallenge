import express from 'express';
import io from 'socket.io';
const path = require('path');
const rn = require('random-number');
const randomNames = require('random-name');

const app = express();

const server = app.listen(8000, function () {
	console.log("Listening on port 8000");
});

const socketServer = io(server);

app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/html/index.html'));
});

var clickCount = 0;

socketServer.on('connection', (client) => {
	client.on('clicked', function (indicator) {
		clickCount++; //Here is where we make our API calls based on our websocket calls
		socketServer.emit('buttonUpdate', clickCount);
	});
	// let payload = [];
	// for (let i = 0; i < rn({ min: 1, max: 15, integer: true }); i++) {
	// 	let arr = [];
	// 	for (let i = 0; i < rn({ min: 1, max: 15, integer: true }); i++) {
	// 		arr.push(rn({ min: 100, max: 999, integer: true }));
	// 	}
		
	// 	payload.push({ name: randomNames(), values: arr });
	// }

	// socketServer.emit('siteRefresh', payload);
});