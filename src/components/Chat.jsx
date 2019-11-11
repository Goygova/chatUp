import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatComposeForm from './ChatComposeForm';

export default class Chat extends React.Component {
	render() {
		return (
			<div>
				<ChatHeader otherUser={this.props.conversation.otherUser}></ChatHeader>

				<ChatBody conversation={this.props.conversation}></ChatBody>

				<ChatComposeForm conversation={this.props.conversation} sendMessage={this.props.sendMessage}></ChatComposeForm>
			</div>
		);
	}
}
