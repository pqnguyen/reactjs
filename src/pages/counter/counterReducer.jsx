import counterActions from '../../redux/actionType/counterActionType'

const initialState = {
    value: 0
}

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case counterActions.INCREMENT:
            return {
                value: state.value + 1
            };

        case counterActions.DECREMENT:
            return {
                value: state.value - 1
            };

        default:
            return state
    }
}

export default counterReducer