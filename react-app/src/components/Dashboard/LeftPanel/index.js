
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './style.css'
import { archiveTask, dataCallTasks } from "../../../store/task";

const LeftPanel = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => Object.values(state.task))
    const filteredTasks = tasks?.filter(task => task?.active === true)
    const [taskId, setTaskId] = useState();
    const [newTaskFlag, setNewTaskFlag] = useState(false)
    const [listView, setListView] = useState('list');


    useEffect(() => {
        dispatch(dataCallTasks())
    }, [dispatch])

    const clickNewTask = () => {
        setNewTaskFlag(!newTaskFlag)
    }


    return (
        <div className='task-list-box'>
            <h1 className='task-list-title-text'>tasks</h1>
            <div className='task-list-box-ctnr'>
                <div className='task-list-menu-slider'>
                    <p onClick={e => clickNewTask(e)}>tasks</p>
                    <p>projects</p>
                </div>
                <div className='task-list-container'>
                    {filteredTasks?.map((task) => (
                        <div 
                        onClick={() => setTaskId(task?.id)}
                        className='task-box'>
                            <div className='checkbox-block'>
                                <FontAwesomeIcon
                                    className='task-list-chk-mark'
                                    icon={faCheckCircle}
                                    onClick={() => dispatch(archiveTask(task?.id))}
                                />
                            </div>
                            <div className='task-info-block'>
                                <div className='task-title-dd-bar'>
                                    <p className='tl-task-title-txt'>{task?.title}</p>
                                    <p className='due_date_txt'>{task?.due_date?.slice(4, 11)}</p>
                                </div>
                                <div className='tl-task-tag-box'>
                                    <div>project here</div>
                                    <div>Incomplete</div>
                                    <FontAwesomeIcon
                                        className="next-icon"
                                        icon={faCaretRight} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftPanel