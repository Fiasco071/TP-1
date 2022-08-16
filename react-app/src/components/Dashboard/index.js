
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck, faPaperclip, faFolderTree, faLink, faThumbsUp, faClock, faEllipsis, faX, faLock } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react"
import './style.css'


const Dashboard = () => {

    const [flag, setFlag] = useState(false)
    let looptime = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


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

                    <input type="text" className="search-bar"></input>
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
                                {looptime.map(() => (
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
                                <h1>Task Title 1</h1>
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
                                </div>
                                <div className="task-comment-box">
                                    
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