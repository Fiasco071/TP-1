import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/task';
// import { useSelector, useDispatch } from 'react-redux'
import './style.css'


const TaskForm = () => {

    const currUser = useSelector(state => state.session)
    const currUser_ID = currUser.user.id

    const dispatch = useDispatch()
    const ref = useRef(null)
    const [title, setTaskTitle] = useState('');
    const [due_date, setDd] = useState();
    const [content, setContent] = useState('');
    const [user_id, setAssignto] = useState(1);
    const [creator_id, setCreatorId] = useState(currUser_ID); // USER ID HERE
    const [project_id, setProjectId] = useState(1);

    const calendarButtonToggle = () => {
        ref.current.showPicker()
    }

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
        <div className='task-form-wrapper'>
            <h1 className='task-new-text'>create a new task</h1>
            <form className='input-box' onSubmit={submitTask}>
                {/* ERROR BLOCK --- FIX THIS LATER */}
                {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

                {/* 1.title */}
                {/* <div 
                    className='calendar-button-box'
                    onClick={e => calendarButtonToggle()}
                ></div> */}
                <div className='input-box'>
                    <label>title</label>
                    <input
                        type='text'
                        name='title'
                        className='title-input-box'
                        onChange={e => setTaskTitle(e.target.value)}
                        value={title}
                    ></input>
                </div>

                {/* nullable 2.due_date */}
                <div className='input-box'>
                    <label
                        className='calendar-button-box'
                        onClick={e => calendarButtonToggle()}
                    >
                        {due_date && (
                            <p className='due_date-text'>{due_date}</p>
                        )}
                        <input
                            ref={ref}
                            type='date'
                            name='due_date'
                            className={`due_date-input`}
                            onChange={e => setDd(e.target.value)}
                            value={due_date}
                        ></input>
                    </label>
                </div>

                {/* nullable 3.content */}
                <div className='input-box'>
                    <label>description</label>
                    <textarea
                        type='text'
                        name='content'
                        className='desc-text-box'
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    ></textarea>
                </div>

                {/* nullable 4. assignto */}
                <div className='input-box'>
                    <label>Assigned To</label>
                    <input
                        type='number'
                        name='user_id'
                        onChange={e => setAssignto(e.target.value)}
                        value={user_id}
                    ></input>
                </div>

                {/* nullable 5. project number */}
                <div className='input-box'>
                    <label>does this belong to a project?</label>
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


                <button 
                className='new-task-submit-button'
                type='submit'>Create New Task!</button>
            </form>
        </div>
    );
};

export default TaskForm;
