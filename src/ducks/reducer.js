const initialState = {
    user: {},
    roomID: null,
    creator: false
}

// consts
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_ROOMID = 'UPDATE_ROOMID'
const UPDATE_CREATOR = 'UPDATE_CREATOR'

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
export function updateCreator() {
    return {
        type: UPDATE_CREATOR,
        payload: true
    }
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER: return {...state, user: action.payload}
        case UPDATE_ROOMID: return {...state, roomID: action.payload}
        case UPDATE_CREATOR: return {...state, creator: action.payload}
        default: return state
    }
}