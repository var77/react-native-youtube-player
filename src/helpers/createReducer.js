export default function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        if(handlers[action.type])
            return handlers[action.type](state, action);

        return state;
    }
}
