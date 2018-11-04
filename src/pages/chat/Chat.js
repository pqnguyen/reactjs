import React from 'react';
import {connect} from 'react-redux';

import './chatStyle.css';
import ChatBox from "./components/ChatBox/ChatBox";
import FriendList from "./components/friendList/FriendList";
import {getUser} from "./chatAction";

class Chat extends React.Component {
    requireLogin = () => {
        if (!localStorage.getItem('chat-token')) {
            this.props.history.push('/login');
        }
    }

    componentWillMount() {
        this.requireLogin()
        this.props.getUser(1)
    }

    render() {
        return (
            <div>
                <div className="container clearfix">

                    <FriendList/>
                    <ChatBox/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, {
    getUser
})(Chat);