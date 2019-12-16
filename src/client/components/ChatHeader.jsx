import React from 'react';
import '../styles/ChatHeader.css';
import Button from '@material-ui/core/Button';

export default class ChatHeader extends React.Component {
	logout() {
		this.props.wsConnection.close();
	}

	render() {
		return (
			<div className='chat-header'>
				<div>{this.props.userName}</div>
				<div className='chat-header-text'>Chat</div>
				<div className='chat-header-logout'>
					<Button onClick={() => this.logout()}>Logout</Button>
				</div>
			</div>
		);
	}
}
