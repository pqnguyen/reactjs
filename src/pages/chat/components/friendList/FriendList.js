import React from 'react';
import {connect} from 'react-redux';
import {getFriendList} from "./friendListAction";
import {chatWith} from "../ChatBox/chatBoxAction";
import Logout from "../../../logout/Logout";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {getUser} from "../../chatAction";

class FriendList extends React.Component {
    constructor() {
        super()
        this.state = {
            search: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.myUser.friends && this.props.myUser.friends) {
            const friendIds = this.props.myUser.friends.map(friend => friend.id)
            this.props.getFriendList(friendIds);
        }
    }

    getStatus = (active, lastActive) => {
        if (active) {
            return 'online';
        } else {
            const miliseconds = Math.abs(new Date() - new Date(lastActive));
            const seconds = Math.floor(miliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);

            if (months < 1) {
                if (days < 1) {
                    if (hours < 1) {
                        if (minutes < 1) {
                            return `left ${minutes} seconds ago`;
                        } else {
                            return `left ${minutes} minutes ago`;
                        }
                    } else {
                        return `left ${hours} hours ago`;
                    }
                } else {
                    return `left ${days} days ago`;
                }
            } else {
                return `online since ${new Date(lastActive).toDateString()}`;
            }
        }
    };

    renderState = (active, lastActive) => {
        const status = this.getStatus(active, lastActive);
        const icon = active ? <i className="fa fa-circle online"></i> : <i className="fa fa-circle offline"></i>;

        return (
            <div className="status">
                {icon} {status}
            </div>
        );
    };

    chatWithFriend = (userId) => () => {
        this.props.chatWith(userId);
    };

    renderFriendItem = (friend) => {
        const {userId, displayName, active, imageUrl, lastActive} = friend;
        return (
            <li className="clearfix friend-item" key={userId} onClick={this.chatWithFriend(userId)}>
                <img src={imageUrl}
                     alt="avatar"/>
                <div className="about">
                    <div className="name">{displayName}</div>
                    {this.renderState(active, lastActive)}
                </div>
            </li>
        );
    };

    handleInput = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    search = (friends, key) => {
        return friends.filter(friend => {
            const {userId, displayName, active, imageUrl, lastActive} = friend;
            return displayName.toLowerCase().includes(key.toLowerCase())
        })
    }

    render() {
        const friends = this.search(this.props.friends, this.state.search)
        const friendItems = friends.map(friend => this.renderFriendItem(friend));
        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" value={this.state.search} onChange={this.handleInput}/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    {friendItems}
                </ul>
                <Logout/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        database: state.common.database,
        friends: state.friendList.friends,
        myUser: state.chat.myUser,
    };
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, {
        getFriendList,
        chatWith
    })
)(FriendList);