import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/ChatBody.css';
import ChatMessage from './ChatMessage';

export default class ChatBody extends React.Component {
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

	render() {
		return (
			<div className='chat-body'>
				{this.props.conversation.messages.map((message, index) => (
					<ChatMessage conversation={this.props.conversation} key={index} message={message}></ChatMessage>
				))}
			</div>
		);
	}
}
