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
