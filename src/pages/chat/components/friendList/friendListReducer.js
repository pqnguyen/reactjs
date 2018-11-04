import * as friendListActionType from "../../../../redux/actionType/friendListActionType";

const initialState = {
    friends: []
};

const orderByLastActiveTime = (friends) => {
    friends.sort((a, b) => {
        const aDate = new Date(a.lastActive);
        const bDate = new Date(b.lastActive);
        if (aDate < bDate)
            return 1;
        if (aDate > bDate)
            return -1;
        return 0;
    });

    return friends;
};

export function friendListReducer(state = initialState, action) {
    switch (action.type) {
        case friendListActionType.GET_FRIEND_LIST_SUCCESS:
            return {
                ...state,
                friends: orderByLastActiveTime(action.response.friends)
            };
        default:
            return state;
    }
}