import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './redux/store'
import Main from './layout/Main'
import "antd/dist/antd.css";
import './App.css'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default App;
