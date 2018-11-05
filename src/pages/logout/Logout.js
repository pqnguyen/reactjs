import React, {Component} from 'react';

import * as firebase from 'firebase';

import {withRouter} from "react-router-dom";
import 'firebase/auth';
import 'firebase/database';
import connect from "react-redux/es/connect/connect";

class Logout extends Component {
    handleClick = () => {
        firebase.auth().signOut();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="sign-out-wrapper">
                <button className="" onClick={this.handleClick}
                        id="quickstart-sign-out">Sign Out
                </button>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

export default withRouter(connect(mapStateToProps, {

})(Logout));