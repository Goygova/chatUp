import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/ChatBody.css';
import ChatMessage from './ChatMessage';

class ChatBody extends React.Component {
	componentDidUpdate() {
		this.scrollDown();
	}
	/**
	 * Scrolls conversation to the bottom.
	 * Executed when new message is rendered.
	 */
	scrollDown() {
		const chatBody = ReactDOM.findDOMNode(this);
		chatBody.scrollTop = chatBody.scrollHeight;
	}

	isPreviousMessageFromSameUser(message, previousMessage) {
		return previousMessage && previousMessage.sender.userName === message.sender.userName;
	}

	deleteMessage(message) {
		const messageEvent = {
			type: 'deleteMessage',
			data: message.id
		};
		this.props.wsConnection.send(JSON.stringify(messageEvent));
	}

	render() {
		return (
			<div className='chat-body'>
				{this.props.conversation.messages.map((message, index) => (
					<ChatMessage
						conversation={this.props.conversation}
						isPreviousMessageFromSameUser={this.isPreviousMessageFromSameUser(message, this.props.conversation.messages[index - 1])}
						key={index}
						message={message}
						userName={this.props.userName}
						deleteMessage={message => this.deleteMessage(message)}></ChatMessage>
				))}
			</div>
		);
	}
}

export default ChatBody;
