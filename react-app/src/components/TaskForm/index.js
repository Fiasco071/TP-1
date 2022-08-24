import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addTask } from '../../store/task';
// import { useSelector, useDispatch } from 'react-redux'

const TaskForm = () => {

    const currUser = useSelector(state => state.session)
    const currUser_ID = currUser.user.id

    const dispatch = useDispatch()
    const [title, setTaskTitle] = useState('');
    const [due_date, setDd] = useState();
    const [content, setContent] = useState('');
    const [user_id, setAssignto] = useState(1);
    const [creator_id, setCreatorId] = useState(currUser_ID); // USER ID HERE
    const [project_id, setProjectId] = useState(1);

    // const dispatch = useDispatch();

    const submitTask = async (e) => {
        e.preventDefault();
        const data = {
            title,
            due_date,
            content,
            user_id,
            creator_id,
            project_id
        };

        dispatch(addTask(data))
    };

    return (
        <form onSubmit={submitTask}>
            {/* ERROR BLOCK --- FIX THIS LATER */}
            {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

            {/* 1.title */}
            <div>
                <label>Task Title</label>
                <input
                    type='text'
                    name='title'
                    onChange={e => setTaskTitle(e.target.value)}
                    value={title}
                ></input>
            </div>

            {/* nullable 2.due_date */}
            <div>
                <label>Due Date</label>
                <input
                    type='date'
                    name='due_date'
                    onChange={e => setDd(e.target.value)}
                    value={due_date}
                ></input>
            </div>

            {/* nullable 3.content */}
            <div>
                <label>Description</label>
                <input
                    type='text'
                    name='content'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                ></input>
            </div>

            {/* nullable 4. assignto */}
            <div>
                <label>Assigned To</label>
                <input
                    type='number'
                    name='user_id'
                    onChange={e => setAssignto(e.target.value)}
                    value={user_id}
                ></input>
            </div>

            {/* nullable 5. project number */}
            <div>
                <label>Project</label>
                <input
                    type='number'
                    name='project_id'
                    onChange={e => setProjectId(e.target.value)}
                    value={project_id}
                ></input>
            </div>

                <input
                    type='hidden'
                    name='creator_id'
                    onChange={e => setCreatorId(e.target.value)}
                    value={creator_id}
                ></input>


            <button type='submit'>Create New Task!</button>
        </form>
    );
};

export default TaskForm;
