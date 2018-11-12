import React from 'react';
import {connect} from 'react-redux';
import {chatWith, getMessages, sendMessage, starFriend} from "./chatBoxAction";
import {getUser} from "../../chatAction";
import {getFriendList} from "../friendList/friendListAction";
import {isImageUrl, isURL} from "../../../../utils/common";
import UploadImage from "./UploadImage";

class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.friends.length && this.props.friends.length) {
            this.props.chatWith(this.props.friends[0].userId);
        }
    }

    renderContent = (content) => {
        if (isURL(content) && isImageUrl(content))
            return (<img className="image-content" src={content}/>);
        return content;
    };

    renderMessageItem = (message) => {
        const {id, content, owner, time} = message;
        const {toUser, fromUser} = this.props;
        if (owner == this.props.fromUser.userId) {
            return (
                <li key={id}>
                    <div className="message-data">
                        <span className="message-data-name"><i
                            className="fa fa-circle online"></i> {fromUser.displayName}</span>
                        <span className="message-data-time">{new Date(time).toLocaleTimeString()}</span>
                    </div>
                    <div className="message my-message">
                        {this.renderContent(content)}
                    </div>
                </li>
            );
        } else {
            return (
                <li className="clearfix" key={id}>
                    <div className="message-data align-right">
                        <span className="message-data-time">{new Date(time).toLocaleTimeString()}</span> &nbsp; &nbsp;
                        <span className="message-data-name">{toUser.displayName}</span> <i
                        className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                        {this.renderContent(content)}
                    </div>
                </li>
            );
        }
    };

    renderMessageHistory = (contents) => {
        this.scrollToBottom();
        return contents.map(content => this.renderMessageItem(content));
    };

    handleStarFriend = () => {
        this.props.starFriend(1, this.props.toUser.userId);
        this.props.getUser(1);

        const friendIds = this.props.fromUser.friends.map(friend => friend.id);
        this.props.getFriendList(friendIds);
    };

    renderChatHeader = (numsMessage) => {
        const {toUser} = this.props;
        let start = {star: 0};
        if (this.props.fromUser.friends)
            start = this.props.fromUser.friends.filter(friend => friend.id === toUser.userId)[0];

        let starStyle = 'fa fa-star';
        if (start.star === 1)
            starStyle += ' active';

        return (
            <div className="chat-header clearfix">
                <img src={toUser.imageUrl}
                     alt="avatar"/>

                <div className="chat-about">
                    <div className="chat-with">Chat with {toUser.displayName}</div>
                    <div className="chat-num-messages">already 1 {numsMessage} messages</div>
                </div>
                <i className={starStyle} onClick={this.handleStarFriend}></i>
            </div>
        );
    };

    handleChangeMessage = (e) => {
        this.setState({
            message: e.target.value
        });
    };

    handleSendMessage = () => {
        const message = this.state.message;
        this.props.sendMessage(1, this.props.toUser.userId, message);
        this.setState({
            message: ''
        });
    };

    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSendMessage();
        }
    };

    handleClick = () => {
        this.handleSendMessage();
    };

    scrollToBottom = () => {
        setTimeout(() => {
            const textarea = document.getElementById('chat-history');
            if (textarea) {
                textarea.scrollTop = textarea.scrollHeight;
            }
        }, 500);
    };

    render() {
        const messages = this.renderMessageHistory(this.props.contents);
        return (
            <div className="chat">
                {this.renderChatHeader(messages.length)}

                <div className="chat-history" id="chat-history">
                    <ul>
                        {messages}
                    </ul>

                </div>

                <div className="chat-message clearfix">
                    <textarea name="message-to-send"
                              id="message-to-send"
                              placeholder="Type your message"
                              rows="3"
                              value={this.state.message}
                              onChange={this.handleChangeMessage}
                              onKeyPress={this.handlePressEnter}
                    >
                    </textarea>

                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>

                    <UploadImage/>

                    <button onClick={this.handleClick}>Send</button>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contents: state.chatBox.contents,
        typing: state.chatBox.typing,
        fromUser: state.chat.myUser,
        toUser: state.chatBox.toUser,
        friends: state.friendList.friends
    };
};

export default connect(mapStateToProps, {
    getMessages,
    sendMessage,
    chatWith,
    starFriend,
    getUser,
    getFriendList
})(ChatBox);