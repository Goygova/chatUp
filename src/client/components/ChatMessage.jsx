import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatMessageOutgoing from './ChatMessageOutgoing';
import ChatMessageIncoming from './ChatMessageIncoming';

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
			<div className='mA'>
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
			</div>
		);
		const attachment = this.props.message.attachmentUrl ? (
			<img className='chat-message-attachment' src={this.props.message.attachmentUrl} width={'100px'} alt='draftImage' />
		) : (
			''
		);
		if (this.isSystemMessage()) {
			return <div className='chat-message-system'>{this.props.message.text}</div>;
		} else if (this.isMessageFromCurrentUser()) {
			return (
				<ChatMessageOutgoing
					dropDownMenu={dropDownMenu}
					message={this.props.message}
					attachment={attachment}
					userName={this.props.userName}
				/>
			);
		} else {
			return (
				<ChatMessageIncoming
					dropDownMenu={dropDownMenu}
					message={this.props.message}
					attachment={attachment}
					isPreviousMessageFromSameUser={this.props.isPreviousMessageFromSameUser}
				/>
			);
		}
	}
}
