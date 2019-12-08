import React from 'react';
import '../styles/ChatHeader.css';

export default class ChatHeader extends React.Component {
	render() {
		return (
			<div className='chat-header'>
				<div>{/* Filler div to center header text*/}</div>
				<div className='chat-header-text'>Chat</div>
				<div className='chat-header-user-name'>{this.props.userName}</div>
			</div>
		);
	}
}
