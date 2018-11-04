import {combineReducers} from 'redux'
import counterReducer from '../pages/counter/counterReducer'
import commonReducers from "./common/commonReducers";
import {friendListReducer} from "../pages/chat/components/friendList/friendListReducer";
import {chatReducer} from "../pages/chat/chatReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    common: commonReducers,
    friendList: friendListReducer,
    chat: chatReducer,
})

export default rootReducer