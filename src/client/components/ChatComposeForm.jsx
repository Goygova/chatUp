import React from 'react';
import '../styles/ChatComposeForm.css';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageModel from '../models/MessageModel';
import Input from '@material-ui/core/Input';

class ChatComposeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			selectedFile: null,
			path: ''
		};
	}

	async onSendMessageClick() {
		if (!this.canSendMessage()) {
			return;
		}

		const message = new MessageModel(this.props.app.user, this.state.messageText, new Date(), 'userMessage');

		const form = new FormData();
		form.append('myImage', this.state.selectedFile);
		form.append('message', JSON.stringify(message));

		const response = await fetch('http://localhost:3001/sendMessage', {
			method: 'POST',
			body: form
		});
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
	async handleKeyDown(event) {
		const ENTER_KEY = 13;
		if (event.keyCode === ENTER_KEY) {
			event.preventDefault();
			if (this.state.messageText && this.state.messageText.trim()) {
				await this.onSendMessageClick();
			}
		}
	}

	clearInput() {
		this.setState({ messageText: '' });
	}

	canSendMessage() {
		return (this.state.messageText && this.state.messageText.trim()) || this.state.selectedFile;
	}

	fileChangedHandler(event) {
		const file = event.target.files[0];
		if (file) {
			this.setState({
				selectedFile: file,
				path: URL.createObjectURL(file)
			});
		}
	}

	render() {
		return (
			<React.Fragment>
				<img src={this.state.path} width={'50px'} />
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
							disabled={!this.canSendMessage()}
							variant='contained'
							color='primary'
							onClick={() => this.onSendMessageClick()}>
							Send
						</Button>
					</div>
					<div>
						<Input type='file' name='myImage' onChange={event => this.fileChangedHandler(event)} />
					</div>
				</form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		app: state.appReducer
	};
};
export default connect(mapStateToProps, null)(ChatComposeForm);
