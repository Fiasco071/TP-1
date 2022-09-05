import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { addTask, editTask } from '../../store/task';
// import { useSelector, useDispatch } from 'react-redux'
import './style.css'


const TaskForm = (props) => {

    const currUser = useSelector(state => state.session);
    const currUser_ID = currUser.user.id;
    const currUserProjectList = currUser.user.projects;

    const task = useSelector(state => state.task[props.editId])

    // console.log(task)
    let due_date_parsed = undefined;
    if (task !== undefined && task?.due_date !== null) {
        // console.log(task)
        // console.log('we got here')
        const test_date = new Date(task?.due_date)
        due_date_parsed = test_date.getFullYear() + '-' + (test_date.getMonth()+1) + '-' + (test_date.getDate() + 1 )
    }

  
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [title, setTaskTitle] = useState(task?.title);
    const [due_date, setDd] = useState(due_date_parsed);
    const [content, setContent] = useState(task?.content);
    const [user_id, setAssignto] = useState(1);
    const [creator_id, setCreatorId] = useState(currUser_ID); // USER ID HERE
    const [project_id, setProjectId] = useState(task?.project_id ? task?.project_id : '');

    const calendarButtonToggle = () => {
        ref.current.showPicker()
    }

    const submitTask = async (e) => {
        e.preventDefault();
        const data = {
            title,
            due_date,
            content,
            creator_id,
            project_id
        };

        props.flagSwap(false)
        dispatch(addTask(data))
    };

    const updateTask = async (e) => {
        e.preventDefault();
        const data = {
            id: props.editId,
            title,
            due_date,
            content,
            creator_id,
            project_id
        };
        props.flagSwap(false)
        dispatch(editTask(data))
    }

    return (
        <div className='task-form-wrapper'>
            <h1 className='task-new-text'>create a new task</h1>
            <form className='input-box'>
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
                        <FontAwesomeIcon
                            className='calendar-icon'
                            icon={faCalendar} />
                        {due_date && (
                            <p className='due_date-text'>{due_date.slice(5) + '-' + due_date.slice(0, 4)}</p>
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
                <div className='input-box assignto-box'>
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
                    <select
                        className='project-select-option-box'
                        value={project_id}
                        name='project_id'
                        onChange={e => setProjectId(e.target.value)}
                    >
                        <option
                            value=''
                            className='option-test-01'
                        >this doesn't belong to a project</option>
                        {currUserProjectList && (
                            currUserProjectList?.map(project => (
                                <option
                                    key={project.id}
                                    value={project.id}
                                    className='option-test'
                                    onClick={e => console.log(project.title)}
                                >
                                    {project.title}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <input
                    type='hidden'
                    name='creator_id'
                    onChange={e => setCreatorId(e.target.value)}
                    value={creator_id}
                ></input>

                {task !== undefined ?
                    <button
                        className='new-task-submit-button'
                        onClick={(e) => updateTask(e)}>
                        update this task!
                    </button> :
                    <button
                        className='new-task-submit-button'
                        onClick={(e) => submitTask(e)}>
                        create new task!
                    </button>
                }
            </form>
        </div>
    );
};

export default TaskForm;
