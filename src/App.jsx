import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserModel from './models/UserModel';
import ConversationModel from './models/ConversationModel';

class App extends React.Component {
	constructor() {
		super();

		this.user1 = new UserModel(1, 'John', 'Doe');
		this.user2 = new UserModel(2, 'Anastasia', 'Goygova');

		const firstConversation = new ConversationModel(this.user1, this.user2);
		const secondConversation = new ConversationModel(this.user2, this.user1);

		/* Set initial state. 
		This state will act as a global state for the app(imitation of Redux state)
		*/
		this.state = {
			[this.user1.id]: firstConversation,
			[this.user2.id]: secondConversation
		};
	}

	/**
	 * Updates state of both conversations when new message is sent
	 * @param {MessageModel} message
	 */
	sendMessage(message) {
		this.setState({
			...this.state,
			[message.sender.id]: {
				...this.state[message.sender.id],
				messages: [...this.state[message.sender.id].messages, message]
			},
			[message.receiver.id]: {
				...this.state[message.receiver.id],
				messages: [...this.state[message.receiver.id].messages, message]
			}
		});
	}

	render() {
		return (
			<div className='App'>
				<Grid container spacing={6}>
					<Grid item xs={6}>
						<Paper>
							<Chat conversation={this.state[this.user1.id]} sendMessage={message => this.sendMessage(message)}></Chat>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper>
							<Chat conversation={this.state[this.user2.id]} sendMessage={message => this.sendMessage(message)}></Chat>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default App;
