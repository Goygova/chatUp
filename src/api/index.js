var WebSocketServer = require('websocket').server;
var http = require('http');
var uuidv1 = require('uuid/v1');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const path = require('path');
const multer = require('multer');

// Define public folder
app.use(express.static(path.join(__dirname, '../../public')));

// Define storage
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb) {
		cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
	}
});

// Image uploader
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 }
}).single('myImage');

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json({ extended: true }));

app.post('/sendMessage', function(req, res) {
	upload(req, res, err => {
		console.log('Request ---', req.body);
		console.log('Request file ---', req.file); //Here you get file.
		/*Now do where ever you want to do*/
		var parsedMsg = JSON.parse(req.body.message);
		if (req.file) {
			parsedMsg.attachmentUrl = './uploads/' + req.file.filename;
		}
		parsedMsg.id = uuidv1();

		var responseMessageEvent = {
			type: 'userMessage',
			data: JSON.stringify(parsedMsg)
		};

		broadcastMessageEventToAll(responseMessageEvent);

		res.send(200);
	});
});

var server = http.createServer(app);

var webSocketsServerPort = 3001;

/**
 * Global variables
 */
var connections = [];
var users = [];

server.listen(webSocketsServerPort, function() {
	console.log(new Date() + ' Server is listening on port ' + webSocketsServerPort);
});

function broadcastMessageEventToAll(messageEvent) {
	for (var i = 0; i < connections.length; i++) {
		connections[i].sendUTF(JSON.stringify(messageEvent));
	}
}
/**
 * WebSocket server
 */
var wsServer = new WebSocketServer({
	httpServer: server,
	path: '/ws'
});

wsServer.on('request', function(request) {
	console.log(new Date() + ' Connection from origin ' + request.origin + '.');
	var connection = request.accept(null, request.origin);
	var index = connections.push(connection) - 1;
	var userName = null;
	var userIndex = -1;

	// when user sent message
	connection.on('message', function(message) {
		var messageEvent = JSON.parse(message.utf8Data);
		switch (messageEvent.type) {
			case 'login':
				userName = messageEvent.data;
				userIndex = users.push(userName) - 1;
				var responseMessageEvent = {
					type: 'userJoined',
					data: userName
				};
				broadcastMessageEventToAll(responseMessageEvent);
				break;
			// case 'userMessage':
			// 	messageEvent.data.id = uuidv1();
			// 	var responseMessageEvent = {
			// 		type: 'userMessage',
			// 		data: JSON.stringify(messageEvent.data)
			// 	};
			// 	broadcastMessageEventToAll(responseMessageEvent);
			// 	break;
			case 'deleteMessage':
				var responseMessageEvent = {
					type: 'deleteMessage',
					data: messageEvent.data
				};
				broadcastMessageEventToAll(responseMessageEvent);
		}
	});

	//  when user disconnected
	connection.on('close', function(connection) {
		if (userName) {
			connections.splice(index, 1);
			users.splice(userIndex, 1);
			var responseMessageEvent = {
				type: 'userLeft',
				data: userName
			};
			broadcastMessageEventToAll(responseMessageEvent);
		}
	});
});
