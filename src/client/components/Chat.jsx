import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatComposeForm from './ChatComposeForm';

export default class Chat extends React.Component {
	render() {
		return (
			<div>
				<ChatHeader userName={this.props.userName}></ChatHeader>

				<ChatBody conversation={this.props.conversation} userName={this.props.userName}></ChatBody>

				<ChatComposeForm conversation={this.props.conversation} wsConnection={this.props.wsConnection}></ChatComposeForm>
			</div>
		);
	}
}