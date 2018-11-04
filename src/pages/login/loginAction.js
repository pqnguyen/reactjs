export const updateUser = (userId, user) => async (dispatch, getState) => {
    await getState().common.database.ref(`users/${userId}`).update({
        displayName: user.displayName,
        email: user.email,
        username: user.email
    })
}