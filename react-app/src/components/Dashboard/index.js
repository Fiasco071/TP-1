
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { archiveTask, dataCallTasks } from '../../store/task'
import RightPanel from "./RightPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import TaskForm from "../TaskForm";
import { logout } from "../../store/session";
import LeftPanel from "./LeftPanel";

const Dashboard = () => {
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

    const selectTask = (v) => {
        setTaskId(v)
    }

    return (
        <div className="dashboard">
            <div className="log-out-button"
                onClick={() => dispatch(logout())}
            >logout</div>
            <div className="dashb-hdr-blck"
                onClick={() => setNewTaskFlag(false)}
            >
                <div className="dashb-hdr-profile-block">
                    <div className="profile-icon-block"></div>
                    <div className="profile-content-block">
                        <select className="viewport-option-block">
                            <option>My Tasks</option>
                            <option>Project</option>
                        </select>
                        <div className="profile-option-block">
                            <p className={`profile-option-block-text ${listView == 'list' ? 'clicked' : ''}`} onClick={e => setListView('list')}>List</p>
                            <p className={`profile-option-block-text ${listView == 'calendar' ? 'clicked' : ''}`} onClick={e => setListView('calendar')}>Calendar</p>
                            <p className={`profile-option-block-text ${listView == 'files' ? 'clicked' : ''}`} onClick={e => setListView('files')}>Files</p>
                        </div>
                    </div>
                </div>
                <div className="dashb-hdr-fnc-block">
                    <div className="dashb-hdr-fnc-type-selector">
                        <select>
                            <option>Private</option>
                            <option>Project</option>
                        </select>
                    </div>

                    <input type="text" className="search-bar" placeholder="Search"></input>
                    <div className="button-blk">
                        <div className="dashb-hdr-fnc-blck-buttons"></div>
                        <div className="dashb-hdr-fnc-blck-buttons"></div>
                        <div className="dashb-hdr-fnc-blck-buttons"></div>
                    </div>
                </div>
            </div>
            <div className="dashb-cnt-blck">
                <div className="viewport-blk">
                    <LeftPanel selectTask={selectTask.bind()} />
                    {/* <div className="left-panel">
                        <div className="l-p-hdr">
                            <div className="new-task-btn" onClick={e => clickNewTask(e)}>
                                + Add Task
                            </div>
                        </div>
                        <div className="l-p-ctnt-blk">
                            <div className="l-p-ctnt-filter-bar">
                                <FontAwesomeIcon className='task-list-chk-mark' icon={faCaretDown} />
                                <p>Recently Assigned</p>
                            </div>
                            <div className="l-p-ctnt-main">
                                {filteredTasks?.map((task) => (
                                    <div
                                        className="task-list-lg"
                                        onClick={() => setTaskId(task?.id)}>
                                        <div className="task-list-lg-title-blk">
                                            <FontAwesomeIcon                
                                                className='task-list-chk-mark'
                                                icon={faCheckCircle} 
                                                onClick={() => dispatch(archiveTask(task?.id))}
                                                />
                                            <p className="task-title-txt">{task?.title}</p>
                                        </div>
                                        <div className="task-info-blk">
                                            <p className="tag-txt">Project</p>
                                            <p className="tag-txt">Study</p>
                                            <p className="task-dd-txt">{task?.due_date?.slice(4, 11)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="viewport-blk">
                    <RightPanel id={taskId} />
                </div>
            </div>
            <div className="dashb-ftr-blck">

            </div>
        </div>
    )
}

export default Dashboard