import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatComposeForm from './ChatComposeForm';
import '../styles/Chat.css';

export default class Chat extends React.Component {
	render() {
		return (
			<div className='chat-container'>
				<ChatHeader userName={this.props.userName} wsConnection={this.props.wsConnection}></ChatHeader>

				<ChatBody conversation={this.props.conversation} userName={this.props.userName} wsConnection={this.props.wsConnection}></ChatBody>

				<ChatComposeForm conversation={this.props.conversation} wsConnection={this.props.wsConnection}></ChatComposeForm>
			</div>
		);
	}
}
