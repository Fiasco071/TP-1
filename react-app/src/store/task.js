// constants
const GET_TASKS = 'task/GET_TASKS';
const ADD_TASK = 'task/ADD_TASK';

const getTasks = (data) => ({
    type: GET_TASKS,
    payload: data
});

const addATask = (data) => ({
    type: ADD_TASK,
    payload: data
});

export const dataCallTasks = () => async (dispatch) => {
    const response = await fetch('/api/tasks', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
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

export const addTask = (data) => async (dispatch) => {
    console.log(data)
    const newData = {
        'title': data.taskTitle,
        'due_date': data.dd,
        'content': data.content,
        'creator_id': data.creatorId,
        'user_id': data.assignto,
        'created_at': data.cTS,
        'updated_at': data.uTS
    }
    const response = await fetch('/api/tasks/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addATask(data))
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
        case ADD_TASK: {
                const newState = { ...state };
                newState[action.payload.id] = action.payload;
                return newState;
              }
        default:
            return state;
    }
}
