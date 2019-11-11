import React from 'react';
import '../styles/ChatComposeForm.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageModel from '../models/MessageModel';

export default class ChatComposeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messageText: '' };
	}
	/**
	 * Creates Message Model and invokes passed in action 'sendMessage'
	 */
	onSendMessageClick() {
		if (!this.state.messageText || !this.state.messageText.trim()) {
			return;
		}
		const { currentUser, otherUser } = this.props.conversation;

		const message = new MessageModel(currentUser, otherUser, this.state.messageText);

		this.props.sendMessage(message);

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
