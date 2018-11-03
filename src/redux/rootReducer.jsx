import {combineReducers} from 'redux'
import counterReducer from '../pages/counter/counterReducer'

const rootReducer = combineReducers({
    counter: counterReducer
})

export default rootReducer