const GET_USERS = 'session/GET_USERS';

const getUsers = (data) => ({
    type: GET_USERS,
    payload: data
});

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    if (response.ok) {
        const users = await response.json()
        dispatch(getUsers(users))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = { users: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            const newState = {};
            action.payload.users.forEach(user => newState[user.id] = user)
            return newState;
        default:
            return state;
    }
}
