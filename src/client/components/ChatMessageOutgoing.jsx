import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import Avatar from '@material-ui/core/Avatar';

class ChatMessageOutgoing extends React.Component {
	render() {
		return (
			<div className='chat-message-sender-container'>
				<div className='mr5'>
					<div className='display-flex flex-direction-column'>
						<div className='display-flex mb5'>
							<div className='display-flex'>{this.props.dropDownMenu}</div>
							<div className='chat-message-sender-text'>{this.props.message.text}</div>
						</div>
						<div className='display-flex justify-content-flex-end'>{this.props.attachment}</div>
					</div>
					<div className='chat-message-date-sender'>{this.props.message.getFormattedSentTime()}</div>
				</div>
				<Avatar>{this.props.userName.substring(0, 1)}</Avatar>
			</div>
		);
	}
}

export default ChatMessageOutgoing;
