import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addTask } from '../../store/task';
// import { useSelector, useDispatch } from 'react-redux'

const TaskForm = () => {

    const user = useSelector(state => state.session)
    const user_ID = user.user.id

    const dispatch = useDispatch()
    const [taskTitle, setTaskTitle] = useState('');
    const [dd, setDd] = useState();
    const [content, setContent] = useState('');
    const [assignto, setAssignto] = useState(1);
    const [creatorId, setCreatorId] = useState(user_ID); // USER ID HERE
    const [projectId, setProjectId] = useState(1);
    const [cTS, setCTS] = useState();
    const [uTS, setUTS] = useState();

    // const dispatch = useDispatch();

    const submitTask = async (e) => {
        e.preventDefault();
        let timeStamp = new Date();

        setCTS(timeStamp)
        setUTS(timeStamp)

        const data = {
            taskTitle,
            dd,
            content,
            assignto,
            creatorId,
            projectId,
            cTS,
            uTS
        };
        await dispatch(addTask(data))
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
                    value={taskTitle}
                ></input>
            </div>

            {/* nullable 2.due_date */}
            <div>
                <label>Due Date</label>
                <input
                    type='date'
                    name='due_date'
                    onChange={e => setDd(e.target.value)}
                    value={dd}
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
                    value={assignto}
                ></input>
            </div>

            {/* nullable 5. project number */}
            <div>
                <label>Project</label>
                <input
                    type='number'
                    name='project_id'
                    onChange={e => setProjectId(e.target.value)}
                    value={projectId}
                ></input>
            </div>

            {/* nullable 5. project number */}
                <input
                    type='hidden'
                    name='creator_id'
                    onChange={e => setCreatorId(e.target.value)}
                    value={creatorId}
                ></input>


            <button type='submit'>Create New Task!</button>
        </form>
    );
};

export default TaskForm;
