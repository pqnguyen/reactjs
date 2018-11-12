import {combineReducers} from 'redux';
import counterReducer from '../pages/counter/counterReducer';
import commonReducers from "./common/commonReducers";
import {friendListReducer} from "../pages/chat/components/friendList/friendListReducer";
import {chatReducer} from "../pages/chat/chatReducer";
import {chatBoxReducer} from "../pages/chat/components/ChatBox/chatBoxReducer";
import {firebaseReducer} from "react-redux-firebase";

const rootReducer = combineReducers({
    counter: counterReducer,
    common: commonReducers,
    friendList: friendListReducer,
    chat: chatReducer,
    chatBox: chatBoxReducer,
    firebase: firebaseReducer
});

export default rootReducer;