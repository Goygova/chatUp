var WebSocketServer = require('websocket').server;
var http = require('http');
var uuidv1 = require('uuid/v1');

var server = http.createServer(function(request, response) {});

var webSocketsServerPort = 3001;

/**
 * Global variables
 */
var connections = [];
var users = [];

server.listen(webSocketsServerPort, function() {
	console.log(new Date() + ' Server is listening on port ' + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new WebSocketServer({
	httpServer: server
});

wsServer.on('request', function(request) {
	console.log(new Date() + ' Connection from origin ' + request.origin + '.');
	var connection = request.accept(null, request.origin);
	var index = connections.push(connection) - 1;
	var userName = null;
	var userIndex = -1;

	// when user sent message
	connection.on('message', function(message) {
		if (!userName) {
			userName = message.utf8Data;

			userIndex = users.push(userName) - 1;

			for (var i = 0; i < connections.length; i++) {
				connections[i].sendUTF(JSON.stringify({ type: 'userJoined', userName: userName }));
			}
		} else {
			var parsedMessage = JSON.parse(message.utf8Data);
			parsedMessage.id = uuidv1();
			for (var i = 0; i < connections.length; i++) {
				connections[i].sendUTF(JSON.stringify({ type: 'chatMessage', message: JSON.stringify(parsedMessage) }));
			}
		}
	});

	//  when user disconnected
	connection.on('close', function(connection) {
		if (userName) {
			connections.splice(index, 1);
			users.splice(userIndex, 1);

			for (var i = 0; i < connections.length; i++) {
				connections[i].sendUTF(JSON.stringify({ type: 'userLeft', userName: userName }));
			}
		}
	});
});
