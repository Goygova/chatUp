import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class ChatMessageDropdownMenu extends React.Component {
	constructor() {
		super();
		this.state = {
			isMenuOpen: false,
			anchorEl: null
		};
	}

	handleClose() {
		this.setState({
			isMenuOpen: false
		});
	}

	handleClick(event) {
		this.setState({
			isMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	deleteMessage() {
		this.props.deleteMessage(this.props.message);
		this.handleClose();
	}

	render() {
		return (
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
	}
}

export default ChatMessageDropdownMenu;
