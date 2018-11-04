import React from 'react';
import {connect} from 'react-redux';

import './chatStyle.css';
import ChatBox from "./components/ChatBox/ChatBox";
import FriendList from "./components/friendList/FriendList";
import {getUser} from "./chatAction";

class Chat extends React.Component {
    componentWillMount() {
        this.props.getUser(1)
    }

    render() {
        const time = '10:12 AM';
        const messageOutput = 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?';
        const response = '';

        return (
            <div>
                <div className="container clearfix">

                    <FriendList/>
                    <ChatBox/>

                </div>


                <li className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time">{time}, Today</span> &nbsp; &nbsp;
                        <span className="message-data-name">Olia</span> <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                        {messageOutput}
                    </div>
                </li>

                <li>
                    <div className="message-data">
                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                        <span className="message-data-time">{time}, Today</span>
                    </div>
                    <div className="message my-message">
                        {response}
                    </div>
                </li>
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