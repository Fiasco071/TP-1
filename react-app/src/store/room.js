const GET_ROOMS = 'room/GET_ROOMS';
const CREATE_ROOM = 'room/CREATE_ROOM';
const CLOSE_ROOM = 'room/CLOSE_ROOM';

// GET ROOMS
const getRooms = (data) => ({
    type: GET_ROOMS,
    payload: data
});

export const getAllRooms = () => async (dispatch) => {
    const response = await fetch(`/api/chat/`)
    if (response.ok) {
        const rooms = await response.json()
        // console.log(rooms, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<redux rooms")
        dispatch(getRooms(rooms))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

// CREATE A ROOM
const makeRoom = (data) => ({
    type: CREATE_ROOM,
    payload: data
});

export const createRoom = (data) => async (dispatch) => {
    const response = await fetch('/api/chat/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(makeRoom(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

// DELETE A ROOM
const closeRoom = (data) => ({
    type: CLOSE_ROOM,
    payload: data
});

export const deleteRoom = (id) => async (dispatch) => {
    const response = await fetch(`/api/chat/${id}/delete`, {
        method: 'PUT'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(closeRoom(id))
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = { rooms: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            const newState = {};
            action.payload.rooms.forEach(room => newState[room.id] = room)
            return newState;
        case CREATE_ROOM: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case CLOSE_ROOM: {
            const newState = { ...state };
            delete newState[action.payload.id]
            return newState;
        }
        default:
            return state;
    }
}
