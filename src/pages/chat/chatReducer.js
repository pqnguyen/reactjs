import * as chatActionType from "../../redux/actionType/chatActionType";

const initialState = {
    myUser: {}
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case chatActionType.GET_MY_USER_SUCCESS:
            return {
                ...state,
                myUser: action.response.user
            }
        default:
            return state
    }
}