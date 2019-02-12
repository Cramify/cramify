const initialState = {
    user: {},
    roomID: null
}

// consts
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_ROOMID = 'UPDATE_ROOMID'

// action builders
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function updateRoomID(roomID) {
    return {
        type: UPDATE_ROOMID,
        payload: roomID
    }
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER: return {...state, user: action.payload}
        case UPDATE_ROOMID: return {...state, roomID: action.payload}
        default: return state
    }
}