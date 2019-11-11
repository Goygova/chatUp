import React from 'react';
import ReactDOM from 'react-dom';
import ChatHeader from '../components/ChatHeader';
import UserModel from '../models/UserModel';

it('should render first name of the other user', () => {
	const otherUser = new UserModel(1, 'Anton', 'Ivanov');
	const div = document.createElement('div');
	ReactDOM.render(<ChatHeader otherUser={otherUser} />, div);
	let headerText = div.querySelector('.chat-header').innerHTML;
	expect(headerText).toBe('Chat with: Anton');
});
