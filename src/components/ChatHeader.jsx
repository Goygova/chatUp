import React from 'react';
import '../styles/ChatHeader.css';

export default class ChatHeader extends React.Component {
	render() {
		return <div className='chat-header'>Chat with: {this.props.otherUser.firstName}</div>;
	}
}
