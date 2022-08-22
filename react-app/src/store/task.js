// constants
const GET_TASKS = 'task/GET_TASKS';

const getTasks = (data) => ({
    type: GET_TASKS,
    payload: data
});

export const dataCallTasks = () => async (dispatch) => {
    //Fetch call
    const response = await fetch('/api/tasks', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //Checking for errors -> 
    if (response.ok) {
        const data = await response.json();
        dispatch(getTasks(data))
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

const initialState = { tasks: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            const newState = {};
            action.payload.tasks.forEach(task => newState[task.id] = task)
            return newState;
        default:
            return state;
    }
}
