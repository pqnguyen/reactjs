import * as friendListActionType from "../../../../redux/actionType/friendListActionType";

const initialState = {
    friends: []
};

const orderByLastActiveTime = (friends, myUser) => {
    const starMap = {}
    myUser.friends.forEach(friend => starMap[friend.id] = friend.star)
    console.log('starMap', starMap)

    friends.sort((a, b) => {
        if (a.active && b.active) {
            if (starMap[a.userId] < starMap[b.userId])
                return 1
            if (starMap[a.userId] > starMap[b.userId])
                return -1
        }
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
                friends: orderByLastActiveTime(action.response.friends, action.meta.myUser)
            };
        default:
            return state;
    }
}