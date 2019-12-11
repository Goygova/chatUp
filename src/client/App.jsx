import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Chat from './components/Chat';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserModel from './models/UserModel';
import MessageModel from './models/MessageModel';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: this.props.app.user.userName,
			connectionIsOpen: false
		};

		this.connection = new WebSocket('ws://localhost:3001');

		this.connection.onopen = () => {
			this.setState({ connectionIsOpen: true });
		};

		this.connection.onmessage = message => {
			var json = JSON.parse(message.data);

			if (json.type === 'userJoined') {
				this.props.sendMessage(new MessageModel(new UserModel('system'), `${json.userName} joined chat`, new Date(), 'system'));
			}

			if (json.type === 'userLeft') {
				this.props.sendMessage(new MessageModel(new UserModel('system'), `${json.userName} left chat`, new Date(), 'system'));
			}

			if (json.type === 'chatMessage') {
				const parsedMsg = JSON.parse(json.message);
				const messageModel = new MessageModel(parsedMsg.sender, parsedMsg.text, new Date(parsedMsg.sentDate));
				messageModel.id = parsedMsg.id;
				this.props.sendMessage(messageModel);
			}
		};
	}

	login() {
		const user = new UserModel(this.state.userName);
		this.props.setUser(user);

		this.connection.send(user.userName);
	}

	handleInputChange(event) {
		this.setState({
			userName: event.target.value
		});
	}

	handleKeyDown(event) {
		const ENTER_KEY = 13;
		if (event.keyCode === ENTER_KEY) {
			if (this.state.userName && this.state.userName.trim()) {
				this.login();
			}
		}
	}

	render() {
		const chat = this.props.app.user.userName ? (
			<Chat conversation={this.props.app.conversation} userName={this.props.app.user.userName} wsConnection={this.connection}></Chat>
		) : (
			<div className='login-form-container'>
				<form className='login-form' autoComplete='off'>
					<TextField
						id='outlined-basic'
						required
						label='User name'
						variant='outlined'
						onChange={event => this.handleInputChange(event)}
						onKeyDown={event => this.handleKeyDown(event)}
					/>
					<Button
						disabled={!this.state.connectionIsOpen || !this.state.userName || !this.state.userName.trim()}
						variant='contained'
						color='primary'
						className='login-form-button'
						onClick={() => this.login()}>
						Join Chat
					</Button>
				</form>
			</div>
		);
		return (
			<div className='App'>
				<Grid container spacing={6} justify='center'>
					<Grid item xs={8}>
						<Paper> {chat} </Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		app: state.appReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setUser: user => {
			dispatch({
				type: 'SET_USER',
				payload: user
			});
		},
		sendMessage: message => {
			dispatch({
				type: 'SEND_MESSAGE',
				payload: message
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
