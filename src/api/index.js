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

function broadcastMessageEventToAll(messageEvent) {
	for (var i = 0; i < connections.length; i++) {
		connections[i].sendUTF(JSON.stringify(messageEvent));
	}
}
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
			case 'chatMessage':
				messageEvent.data.id = uuidv1();
				var responseMessageEvent = {
					type: 'chatMessage',
					data: JSON.stringify(messageEvent.data)
				};
				broadcastMessageEventToAll(responseMessageEvent);
				break;
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
