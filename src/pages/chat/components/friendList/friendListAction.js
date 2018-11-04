import * as friendListActionType from "../../../../redux/actionType/friendListActionType";

export const getFriendList = (keys) => async (dispatch, getState) => {
    const promises = keys.map(key => getState().common.database.ref('users').child(key).once('value'));
    const friends = await Promise.all(promises);
    const friendList = friends ? friends.map(friend => friend.val()) : [];

    const action = {
        type: friendListActionType.GET_FRIEND_LIST_SUCCESS,
        response: {
            friends: friendList
        }
    };
    dispatch(action);
};

export const getAllUser = () => async (dispatch, getState) => {
    const friends = await getState().common.database.ref('users').once('value');
    const friendList = [];
    friends.forEach(friend => {
        friendList.push(friend.val());
    });

    const action = {
        type: friendListActionType.GET_ALL_USERS_SUCCESS,
        response: {
            friends: friendList
        }
    };
    dispatch(action);
};