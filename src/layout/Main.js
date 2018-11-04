import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Chat from "../pages/chat/Chat";

class Main extends React.Component {

    componentDidMount() {
        this.fakeData();
    }

    fakeData = () => {
        this.writeUserData(1, 'pqnguyen',
            'Nguyen Phan',
            'pqnguyen1996@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
            true,
            new Date().toLocaleString(), [2, 3, 4, 5, 6, 7, 8]);
        this.writeUserData(2,
            'vincentporter',
            'Vincent Porter',
            'vincentporter@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
            false,
            new Date("11/4/2018, 4:49:49 AM").toLocaleString());
        this.writeUserData(3,
            'aidenchavez',
            'Aiden Chavez',
            'aidenchavez@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
            true,
            new Date().toLocaleString());
        this.writeUserData(4,
            'ericahughes',
            'Erica Hughes',
            'ericahughes@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
            true,
            new Date().toLocaleString());
        this.writeUserData(5,
            'gingerjohnston',
            'Ginger Johnston',
            'gingerjohnston@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg',
            false,
            new Date("11/2/2018, 9:49:49 AM").toLocaleString());
        this.writeUserData(6,
            'vincentporter',
            'Vincent Porter',
            'vincentporter@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg',
            true,
            new Date().toLocaleString());
        this.writeUserData(7,
            'gingerjohnston',
            'Ginger Johnston',
            'gingerjohnston@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg',
            false,
            new Date("11/2/2018, 9:49:49 AM").toLocaleString());
        this.writeUserData(8,
            'monicaward',
            'Monica Ward',
            'monicaward@gmail.com',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg',
            true,
            new Date().toLocaleString());

        // this.writeMessages(1, 3);
    };

    content = () => {
        return (
            <Router>
                <Switch>
                </Switch>
            </Router>
        );
    };

    writeUserData = (userId, username, displayName, email, imageUrl, active, lastActive, friends = []) => {
        this.props.database.ref('users/' + userId).set({
            userId,
            username,
            displayName,
            email,
            imageUrl,
            active,
            lastActive,
            friends
        });
    };

    writeMessages = (fromUser, toUser) => {
        this.props.database.ref(`messages/${fromUser}/${toUser}`).set({
            contents: [
                {
                    id: '-LQSPPpufjLs0LMu5BeS',
                    owner: toUser,
                    time: new Date().toLocaleString(),
                    content: 'Hi Vincent, how are you? How is the project coming along?'
                },
                {
                    id: '-LQSPXHgWJFFXuEOmopB',
                    owner: fromUser,
                    time: new Date().toLocaleString(),
                    content: 'Are we meeting today? Project has been already finished and I have results to show you.'
                },
                {
                    id: '-LQSPhLlc-SnSRAyrkcL',
                    owner: toUser,
                    time: new Date().toLocaleString(),
                    content: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'
                },
                {
                    id: '-LQSPkA2nrHLFh4mN0bp',
                    owner: fromUser,
                    time: new Date().toLocaleString(),
                    content: 'Actually everything was fine. I\'m very excited to show this to our team.'
                }
            ],
            typing: toUser
        });
    };

    render() {

        return (
            <Layout>
                {/*{this.content()}*/}
                <Chat/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        database: state.common.database
    };
};

export default connect(mapStateToProps, {})(Main);