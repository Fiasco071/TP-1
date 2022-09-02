const GET_PROJECTS = 'project/GET_PROJECTS';
const ADD_PROJECT = 'project/ADD_PROJECT';
const UPDATE_PROJECT = 'project/UPDATE_PROJECT';
const ARCHV_PROJECT = 'project/ARCHV_PROJECT';

// GET PROJECTS
const getProjects = (data) => ({
    type: GET_PROJECTS,
    payload: data
});

export const getAllProjects = () => async (dispatch) => {
    const response = await fetch(`/api/projects/`)
    if (response.ok) {
        const projects = await response.json()
        console.log(projects, "<<<<<<<<<< Get all thunk for projects")
        dispatch(getProjects(projects))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

//CREATE PROJECT
const addProject = (data) => ({
    type: ADD_PROJECT,
    payload: data
});

export const createProject = (data) => async (dispatch) => {
    const response = await fetch('/api/projects/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addProject(data))
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

//UPDATE PROJECT
const updateAProject = (data) => ({
    type: UPDATE_PROJECT,
    payload: data
});

export const editProject = (data) => async (dispatch) => {
    const response = await fetch(`/api/projects/${data.id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateAProject(data))
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

//ARCHIVE PROJECT
const archiveProject = (data) => ({
    type: ARCHV_PROJECT,
    payload: data
});
