import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './rootReducer'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from "firebase";

const loggerMiddleware = createLogger();

let composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
    }) : compose;

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const store = createStore(
    rootReducer,
    undefined, composeEnhancer(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(loggerMiddleware),
        reactReduxFirebase(firebase, rrfConfig)
    )
);

export default store;