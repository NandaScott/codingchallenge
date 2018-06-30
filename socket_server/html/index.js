var socket = io.connect('http://localhost:8000');

var paragraph = document.getElementById('clickedCount');
var button = document.getElementById('button');

function buttonClicked (client) {
	socket.emit('clicked', 'hello');
}

button.addEventListener('click', function () {
	buttonClicked();
});

socket.on('buttonUpdate', function (data) {
	console.log('in browser', data);
	paragraph.innerHTML = `The button has been clicked ${data} times.`
});