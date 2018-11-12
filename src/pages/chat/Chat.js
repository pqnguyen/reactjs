import React from 'react';
import {connect} from 'react-redux';

import './chatStyle.css';
import ChatBox from "./components/ChatBox/ChatBox";
import FriendList from "./components/friendList/FriendList";
import {getUser} from "./chatAction";
import {firebaseConnect, getVal, withFirebase} from "react-redux-firebase";
import {compose} from "redux";

class Chat extends React.Component {
    requireLogin = () => {
        if (!localStorage.getItem('chat-token')) {
            this.props.history.push('/login');
        }
    };

    componentWillMount() {
        this.requireLogin();
        this.props.getUser(1);
    }

    render() {
        // const sampleTodo = { text: 'Sample', done: false }
        // const pushSample = () => this.props.firebase.push('todos', sampleTodo)
        // pushSample()

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

const mapStateToProps = (state, props) => {
    return {};
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, {
        getUser
    })
)(Chat);