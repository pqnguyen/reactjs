import React, {Component} from 'react';

import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
import connect from "react-redux/es/connect/connect";
import {getUser} from "../chat/chatAction";
import {updateUser} from "./loginAction";

class Login extends Component {
    constructor() {
        super();
        window.onload = this.initApp;
    }

    toggleSignIn = () => {
        if (!firebase.auth().currentUser) {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                const token = result.credential.accessToken;
                const user = result.user;
            }).catch(function (error) {
                console.log('error', error);
            });
        } else {
            firebase.auth().signOut();
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    };

    handleSignin = (user) => {
        this.props.updateUser(1, user);
        localStorage.setItem('chat-token', user.uid);
        localStorage.setItem('user-info', JSON.stringify(user.providerData[0]));
        this.props.history.push('/');
    };

    initApp = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const displayName = user.displayName;
                const email = user.email;

                document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                document.getElementById('quickstart-account-displayname').textContent = displayName;
                document.getElementById('quickstart-account-email').textContent = email;

                this.handleSignin(user);
            } else {
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                document.getElementById('quickstart-account-displayname').textContent = 'Anonymous';
                document.getElementById('quickstart-account-email').textContent = 'Anonymous';
            }
            // document.getElementById('quickstart-sign-in').disabled = false;
        });

        document.getElementById('quickstart-sign-in').addEventListener('click', this.toggleSignIn, false);
    };

    render() {
        return (
            <div className="App">
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                    <p>Sign in with your Google account below.</p>

                    <button className="mdl-button mdl-js-button mdl-button--raised"
                            id="quickstart-sign-in">Sign in with Google
                    </button>

                    <div className="quickstart-user-details-container">
                        Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
                        <div>Firebase auth <code>currentUser</code> object value:</div>
                        <pre><code id="quickstart-account-displayname">null</code></pre>
                        <pre><code id="quickstart-account-email">null</code></pre>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    updateUser
})(Login);
