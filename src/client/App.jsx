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

		this.connection = this.createNewConnection();
	}

	componentDidUpdate() {
		if (this.connection.readyState === 2 || this.connection.readyState === 3) {
			this.connection = this.createNewConnection();
		}
	}

	createNewConnection() {
		const connection = new WebSocket('ws://localhost:3001');

		connection.onopen = () => {
			this.setState({ connectionIsOpen: true });
			const userNameFromStorage = localStorage.getItem('userName');
			if (userNameFromStorage) {
				this.login(userNameFromStorage);
			}
		};

		connection.onclose = () => {
			localStorage.removeItem('userName');
			this.props.resetAppState();
		};

		connection.onmessage = messageEvent => {
			const message = JSON.parse(messageEvent.data);
			switch (message.type) {
				case 'userJoined':
					this.props.sendMessage(new MessageModel(new UserModel('system'), `${message.data} joined chat`, new Date(), 'system'));
					break;
				case 'chatMessage':
					const parsedMsg = JSON.parse(message.data);
					const messageModel = new MessageModel(parsedMsg.sender, parsedMsg.text, new Date(parsedMsg.sentDate));
					messageModel.id = parsedMsg.id;
					this.props.sendMessage(messageModel);
					break;
				case 'deleteMessage':
					this.props.deleteMessage(message.data);
					break;
				case 'userLeft':
					this.props.sendMessage(new MessageModel(new UserModel('system'), `${message.data} left chat`, new Date(), 'system'));
			}
		};
		return connection;
	}

	login(userName) {
		localStorage.setItem('userName', userName);
		const user = new UserModel(userName);
		this.props.setUser(user);

		const messageEvent = {
			type: 'login',
			data: user.userName
		};
		this.connection.send(JSON.stringify(messageEvent));
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
				this.login(this.state.userName);
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
						onClick={() => this.login(this.state.userName)}>
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
		},
		deleteMessage: id => {
			dispatch({
				type: 'DELETE_MESSAGE',
				payload: id
			});
		},
		resetAppState: () => {
			dispatch({
				type: 'RESET_APP_STATE'
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
