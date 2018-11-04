import React from 'react';
import {connect} from 'react-redux';
import {getFriendList} from "./friendListAction";

class FriendList extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.myUser.friends && this.props.myUser.friends) {
            this.props.getFriendList(this.props.myUser.friends);
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
        const icon = active ? <i className="fa fa-circle online"></i> : <i className="fa fa-circle offline"></i>

        return (
            <div className="status">
                {icon} {status}
            </div>
        );
    };

    renderFriendItem = (friend) => {
        const {userId, displayName, active, imageUrl, lastActive} = friend;
        return (
            <li className="clearfix" key={userId}>
                <img src={imageUrl}
                     alt="avatar"/>
                <div className="about">
                    <div className="name">{displayName}</div>
                    {this.renderState(active, lastActive)}
                </div>
            </li>
        );
    };

    render() {

        const friendItems = this.props.friends.map(friend => this.renderFriendItem(friend));
        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search"/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    {friendItems}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        database: state.common.database,
        friends: state.friendList.friends,
        myUser: state.chat.myUser
    };
};

export default connect(mapStateToProps, {
    getFriendList
})(FriendList);