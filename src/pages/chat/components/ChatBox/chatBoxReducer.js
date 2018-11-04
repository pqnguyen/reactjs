import * as chatBoxActionType from "../../../../redux/actionType/chatBoxActionType";

const initialState = {
    contents: [],
    typing: 1,
    toUser: {
        userId: 3
    }
};

export function chatBoxReducer(state = initialState, action) {
    switch (action.type) {
        case chatBoxActionType.GET_MESSAGES:
            return {
                ...state,
                contents: action.response.contents,
                typing: action.response.typing
            };
        case chatBoxActionType.CHAT_WITH:
            return {
                ...state,
                toUser: action.response
            }
        default:
            return state;
    }
}