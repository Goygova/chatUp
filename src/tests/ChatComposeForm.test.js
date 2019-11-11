import React from 'react';
import ReactDOM from 'react-dom';
import ChatComposeForm from '../components/ChatComposeForm';
import UserModel from '../models/UserModel';
import ConversationModel from '../models/ConversationModel';
import { shallow } from 'enzyme';

it('should verify that handleKeyDown func is called on Enter press', () => {
	const user1 = new UserModel(1, 'FirstName', 'LastName');
	const user2 = new UserModel(2, 'FirstName', 'LastName');
	const conversation = new ConversationModel(user1, user2);
	const handleKeyDownSpy = jest.spyOn(ChatComposeForm.prototype, 'handleKeyDown');

	const wrapper = shallow(<ChatComposeForm conversation={conversation} sendMessage={() => {}}></ChatComposeForm>);
	wrapper.setState({ messageText: 'hi' });
	const inputField = wrapper.find('.chat-compose-form__text-field');
	inputField.simulate('keyDown', { keyCode: 13, preventDefault: () => {} });

	expect(handleKeyDownSpy).toHaveBeenCalled();
});

it('should verify that clearInput func is executed when sending a message', () => {
	const user1 = new UserModel(1, 'FirstName', 'LastName');
	const user2 = new UserModel(2, 'FirstName', 'LastName');
	const conversation = new ConversationModel(user1, user2);
	const clearInputSpy = jest.spyOn(ChatComposeForm.prototype, 'clearInput');

	const wrapper = shallow(<ChatComposeForm conversation={conversation} sendMessage={() => {}}></ChatComposeForm>);
	wrapper.setState({ messageText: 'hi' });

	const sendButton = wrapper.find('.chat-compose-form__send-button');

	sendButton.simulate('click');

	expect(clearInputSpy).toHaveBeenCalled();
});

it('should verify that sendMessage func is not called when input field is empty', () => {
	const user1 = new UserModel(1, 'FirstName', 'LastName');
	const user2 = new UserModel(2, 'FirstName', 'LastName');
	const conversation = new ConversationModel(user1, user2);

	const mockSendMessage = jest.fn();

	const wrapper = shallow(<ChatComposeForm conversation={conversation} sendMessage={() => mockSendMessage()}></ChatComposeForm>);

	const sendButton = wrapper.find('.chat-compose-form__send-button');

	sendButton.simulate('click');

	expect(mockSendMessage.mock.calls.length).toBe(0);
});

it('should verify that sendMessage func is called when input field has value', () => {
	const user1 = new UserModel(1, 'FirstName', 'LastName');
	const user2 = new UserModel(2, 'FirstName', 'LastName');
	const conversation = new ConversationModel(user1, user2);

	const mockSendMessage = jest.fn();

	const wrapper = shallow(<ChatComposeForm conversation={conversation} sendMessage={() => mockSendMessage()}></ChatComposeForm>);

	const sendButton = wrapper.find('.chat-compose-form__send-button');

	wrapper.setState({ messageText: 'hi' });

	sendButton.simulate('click');

	expect(mockSendMessage.mock.calls.length).toBe(1);
});
