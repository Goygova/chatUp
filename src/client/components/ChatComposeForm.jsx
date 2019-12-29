import React from 'react';
import '../styles/ChatComposeForm.css';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageModel from '../models/MessageModel';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileIcon from '@material-ui/icons/AttachFile';

class ChatComposeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			selectedFile: null,
			path: ''
		};
		/**
		 * reference to a file input to be able to reset the value after sending a msg
		 */
		this.attachFileInputRef = React.createRef();
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
		this.removeDraftImage();
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
		this.setState({
			messageText: ''
		});
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

	removeDraftImage() {
		this.setState({
			path: '',
			selectedFile: null
		});
		this.attachFileInputRef.current.value = '';
	}
	render() {
		const draftImage = this.state.path ? (
			<div className='chat-compose-form__draft-image-container'>
				<div className='chat-compose-form__image-with-remove-btn-container'>
					<img className='chat-compose-form__draft-image' src={this.state.path} alt='draftImage' />
					<div className='chat-compose-form__remove-draft-image'>
						<IconButton aria-label='delete' size='small' onClick={() => this.removeDraftImage()}>
							<ClearIcon />
						</IconButton>
					</div>
				</div>
			</div>
		) : (
			''
		);
		return (
			<React.Fragment>
				<form className='chat-compose-form'>
					{draftImage}
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
						{/**
						 * Material Design button that delegates a click event to the hidden input file element
						 */}
						<IconButton onClick={() => this.attachFileInputRef.current.click()}>
							<AttachFileIcon />
						</IconButton>
					</div>
					{/**
					 * standard HTML input is not alligned with Material Design
					 * so hiding this input, we still need this input since we handle atachment selection
					 * via it
					 */}
					<input
						className='display-none'
						type='file'
						name='myImage'
						ref={this.attachFileInputRef}
						onChange={event => this.fileChangedHandler(event)}
					/>
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
