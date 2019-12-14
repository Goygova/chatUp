import React from 'react';
import '../styles/ChatComposeForm.css';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageModel from '../models/MessageModel';

class ChatComposeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messageText: '' };
	}

	onSendMessageClick() {
		if (!this.state.messageText || !this.state.messageText.trim()) {
			return;
		}

		const message = new MessageModel(this.props.app.user, this.state.messageText);

		const messageEvent = {
			type: 'chatMessage',
			data: message
		};

		this.props.wsConnection.send(JSON.stringify(messageEvent));

		this.clearInput();
	}

	/**
	 * Updates state on input change
	 * @param {Event} event
	 */
	handleInputChange(event) {
		this.setState({ messageText: event.target.value });
	}

	/**
	 * Handles button click
	 * @param {Event} event
	 */
	handleKeyDown(event) {
		const ENTER_KEY = 13;
		if (event.keyCode === ENTER_KEY) {
			event.preventDefault();
			if (this.state.messageText && this.state.messageText.trim()) {
				this.onSendMessageClick();
			}
		}
	}

	clearInput() {
		this.setState({ messageText: '' });
	}

	render() {
		return (
			<form className='chat-compose-form'>
				<TextField
					multiline
					rows='4'
					placeholder='Compose a message'
					variant='outlined'
					className='chat-compose-form__text-field'
					value={this.state.messageText}
					onChange={event => this.handleInputChange(event)}
					onKeyDown={event => this.handleKeyDown(event)}
				/>
				<div className='chat-compose-form__actions-container'>
					<Button
						className='chat-compose-form__send-button'
						disabled={!this.state.messageText || !this.state.messageText.trim()}
						variant='contained'
						color='primary'
						onClick={() => this.onSendMessageClick()}>
						Send
					</Button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		app: state.appReducer
	};
};
export default connect(mapStateToProps, null)(ChatComposeForm);
