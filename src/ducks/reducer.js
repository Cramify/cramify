const initialState = {
    username: '',
    score: 0
}

// consts
const UPDATE_USER = 'UPDATE_USER'

// action builders
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER: return {...state, username: action.payload}
        default: return state
    }
}