import React from 'react'
import {connect} from 'react-redux'

import {increate, decreate} from './counterAction'

class CounterPage extends React.Component {
    render() {
        return (
            <p>
                Clicked: {this.props.value} times
                {' '}
                <button onClick={this.props.onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={this.props.onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={() => setTimeout(this.props.onIncrement, 1000)}>
                    Increment async
                </button>
            </p>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.counter.value
})

const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch(increate()),
    onDecrement: () => dispatch(decreate())
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage)