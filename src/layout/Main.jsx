import React from 'react'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import {Row, Col} from "antd";

class Main extends React.Component {
    content = () => {
        return (
            <Router>
                <Switch>
                </Switch>
            </Router>
        )
    }

    render() {
        return (
            <Layout>
                {this.content()}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {})(Main)