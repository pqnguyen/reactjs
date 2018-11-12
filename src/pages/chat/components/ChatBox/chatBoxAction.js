import * as chatBoxActionType from "../../../../redux/actionType/chatBoxActionType";

export const getMessages = (fromUser, toUser) => async (dispatch, getState) => {
    const messages = await getState().common.database.ref(`messages/${fromUser}/${toUser}`).once('value');
    const messageList = messages.val() ? messages.val() : [];

    const data = {
        type: chatBoxActionType.GET_MESSAGES,
        response: {
            contents: messageList.contents ? Object.values(messageList.contents) : [],
            typing: messageList.typing
        }
    };

    dispatch(data);
};

export const sendMessage = (fromUser, toUser, message) => async (dispatch, getState) => {
    const path = `messages/${fromUser}/${toUser}/contents`;
    console.log('path', path);
    const key = getState().common.database.ref(path).push().key;

    const messageDocument = {
        content: message,
        id: key,
        owner: fromUser,
        time: new Date().toLocaleString()
    };

    await getState().common.database.ref(`messages/${fromUser}/${toUser}/contents`).push(messageDocument);

    dispatch(getMessages(fromUser, toUser));
};

export const chatWith = (toUser) => async (dispatch, getState) => {
    const {friends} = getState().friendList;
    for (let friend of friends) {
        if (friend.userId === toUser) {
            dispatch({
                type: chatBoxActionType.CHAT_WITH,
                response: friend
            });
            break;
        }
    }

    const {myUser} = getState().chat;
    dispatch(getMessages(myUser.userId, toUser));
};

export const starFriend = (fromUser, toUser) => async (dispatch, getState) => {
    const friends = getState().chat.myUser.friends;
    console.log('friends', friends)
    let index = fromUser;
    for (let i in friends) {
        if (friends[i].id === toUser) {
            index = i;
            break;
        }
    }
    const path = `users/${fromUser}/friends/${index}/star`;
    console.log('path', path);
    let check = 0
    if (friends[index].star === 0)
        check = 1

    console.log('check', check)
    getState().common.database.ref(path).set(check);
};