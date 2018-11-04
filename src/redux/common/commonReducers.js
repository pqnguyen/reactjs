import {database} from "../../client/firebase";

const initialState = {
    database: database
}

function commonReducers(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

export default commonReducers