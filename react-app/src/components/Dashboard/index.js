
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck, faPaperclip, faFolderTree, faLink, faThumbsUp, faClock, faEllipsis, faX, faLock } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { dataCallTasks } from '../../store/task'

const Dashboard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => Object.values(state.task))
    const [tasksData, setTaskData] = useState([]);
    useEffect(() => {
        dispatch(dataCallTasks())
        setTaskData(tasks)
    }, [dispatch])

    
    console.log(tasks)

    const [flag, setFlag] = useState(false)
    let looptime = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let looptime2 = [1, 1, 1, 1, 1, 1, 1]

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
                                {tasks.map(() => (
                                    <div className="task-list-lg">
                                        <div className="task-list-lg-title-blk">
                                            <FontAwesomeIcon className='task-list-chk-mark' icon={faCheckCircle} />
                                            <p className="task-title-txt">Task number 1</p>
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
                    <div className="right-panel">
                        <div className="r-p-hdr">
                            <div className="complete-btn-box">
                                <FontAwesomeIcon icon={faCheck} />
                                <p className="complete-btn-txt">Mark Complete</p>
                            </div>
                            <div className="r-p-hdr-button-box">
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faPaperclip} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faFolderTree} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faLink} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faThumbsUp} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faClock} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faEllipsis} />
                                <FontAwesomeIcon className="r-p-hdr-button" icon={faX} />
                            </div>
                        </div>
                        <div className="r-p-task-detail-type-bar">
                            <FontAwesomeIcon className="r-p-hdr-button" icon={faLock} />
                            This task is private to you
                        </div>
                        <div className="r-p-task-detail-content-box">
                            <div className="r-p-task-detail-content-main">
                                <h1 className="task-detail-title-txt">Task Title 1</h1>
                                <div>
                                    <div className="task-detail-info-blk">
                                        <p>Assignee</p>
                                        <p>Steve Choi</p>
                                    </div>
                                    <div className="task-detail-info-blk">
                                        <p>Due Date</p>
                                        <p>No Due Date</p>
                                    </div>
                                    <div className="task-detail-info-blk">
                                        <p>Projects</p>
                                        <p>Add to projects</p>
                                    </div>
                                    <div className="task-detail-info-blk">
                                        <p>Description</p>
                                        <p>Add more detail to this task...</p>
                                    </div>
                                    <div className="task-comment-list-box">
                                        {looptime2.map(() => (
                                            <div className="task-comment-bx">
                                                <div className="cmnt-profile-blk">
                                                    <div className="profile-icon-block"></div>
                                                    <p>User One</p>
                                                </div>
                                                <p className="cmnt-ctnt-blk">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce augue enim, scelerisque eget mi ut, tristique blandit dui. Quisque pulvinar ligula eget arcu hendrerit dapibus. Duis sodales finibus nunc, eget sodales ligula eges.</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="task-comment-input-box">
                                <div className="task-comment-input-box-main">
                                    <div className="cmnt-input-box-profile-box">
                                        <div className="profile-icon-block"></div>
                                        <p>User One</p>
                                    </div>
                                    <textarea className="cmnt-input-bx" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashb-ftr-blck">

            </div>
        </div>
    )
}

export default Dashboard