import * as chatActionType from "../../redux/actionType/chatActionType";

export const getUser = (userId) => async (dispatch, getState) => {
    const user = await getState().common.database.ref(`users/${userId}`).once('value')
    const data = {
        type: chatActionType.GET_MY_USER_SUCCESS,
        response: {
            user: user.val()
        }
    }
    dispatch(data)
}