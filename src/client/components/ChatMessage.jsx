import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

export default class ChatMessage extends React.Component {
	constructor() {
		super();
		this.state = {
			isMenuOpen: false,
			anchorEl: null
		};
	}
	isMessageFromCurrentUser() {
		return this.props.message.sender.userName === this.props.userName;
	}

	isSystemMessage() {
		return this.props.message.type === 'system';
	}

	handleClick(event) {
		this.setState({
			isMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleClose() {
		this.setState({
			isMenuOpen: false
		});
	}

	deleteMessage() {
		this.props.deleteMessage(this.props.message);
		this.handleClose();
	}

	render() {
		const dropDownMenu = (
			<React.Fragment>
				<IconButton size='small' aria-label='more' aria-controls='menu' aria-haspopup='true' onClick={event => this.handleClick(event)}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='menu'
					keepMounted
					anchorEl={this.state.anchorEl}
					open={this.state.isMenuOpen}
					onClose={() => this.handleClose()}
					PaperProps={{
						style: {
							marginTop: 50
						}
					}}>
					<MenuItem onClick={() => this.deleteMessage()}>Delete</MenuItem>
				</Menu>
			</React.Fragment>
		);
		if (this.isSystemMessage()) {
			return <div className='chat-message-system'>{this.props.message.text}</div>;
		} else if (this.isMessageFromCurrentUser()) {
			return (
				<div className='chat-message-sender-container'>
					<div className='mr5'>
						<div className='display-flex'>
							<div className='display-flex'>{dropDownMenu}</div>
							<div className='chat-message-sender-text'>{this.props.message.text}</div>
						</div>
						<div className='chat-message-date-sender'>{this.props.message.getFormattedSentTime()}</div>
					</div>
					<Avatar>{this.props.userName.substring(0, 1)}</Avatar>
				</div>
			);
		} else {
			return (
				<div className='chat-message-from-other-user-container'>
					{!this.props.isPreviousMessageFromSameUser ? (
						<div className='chat-message-sender-name'>{this.props.message.sender.userName}</div>
					) : (
						''
					)}
					<div className='display-flex'>
						<Avatar>{this.props.message.sender.userName.substring(0, 1)}</Avatar>
						<div className='ml5'>
							<div className='display-flex'>
								<div className='display-flex'>
									<div className='chat-message-from-other-user'>{this.props.message.text}</div>
									{dropDownMenu}
								</div>
							</div>
							<div className='chat-message-date-from-other-user'>{this.props.message.getFormattedSentTime()}</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
