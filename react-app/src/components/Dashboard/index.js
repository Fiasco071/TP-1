
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { dataCallTasks } from '../../store/task'
import RightPanel from "./RightPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const Dashboard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => Object.values(state.task))
    const [tasksData, setTaskData] = useState([]);
    const [taskId, setTaskId] = useState();
    useEffect(() => {
        dispatch(dataCallTasks())
        setTaskData(tasks)
    }, [dispatch])

    // const [flag, setFlag] = useState(false)

    return (
        <div className="dashboard">
            <div className="dashb-hdr-blck">
                <div className="dashb-hdr-profile-block">
                    <div className="profile-icon-block"></div>
                    <div className="profile-content-block">
                        <select className="viewport-option-block">
                            <option>My Tasks</option>
                            <option>Project</option>
                        </select>
                        <div className="profile-option-block">
                            <p className="profile-option-block-text">List</p>
                            <p className="profile-option-block-text">Calendar</p>
                            <p className="profile-option-block-text">Files</p>
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
                    <div className="left-panel">
                        <div className="l-p-hdr">
                            <div className="new-task-btn">
                                + Add Task
                            </div>
                        </div>
                        <div className="l-p-ctnt-blk">
                            <div className="l-p-ctnt-filter-bar">
                                <FontAwesomeIcon className='task-list-chk-mark' icon={faCaretDown} />
                                <p>Recently Assigned</p>
                            </div>
                            <div className="l-p-ctnt-main">
                                {tasks.map((task) => (
                                    <div 
                                        className="task-list-lg" 
                                        onClick={() => setTaskId(task.id)}>
                                        <div className="task-list-lg-title-blk">
                                            <FontAwesomeIcon className='task-list-chk-mark' icon={faCheckCircle} />
                                            <p className="task-title-txt">{task.title}</p>
                                        </div>
                                        <div className="task-info-blk">
                                            <p className="tag-txt">Project</p>
                                            <p className="tag-txt">Study</p>
                                            <p className="task-dd-txt">22 Aug</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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