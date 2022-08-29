
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck, faPaperclip, faFolderTree, faLink, faThumbsUp, faClock, faEllipsis, faX, faLock, faWrench } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import './style.css'
import TaskForm from "../../TaskForm";
import { useState } from "react";

const RightPanel = ({ id }) => {

    const task = useSelector(state => state.task[id])
    let looptime2 = [1, 1, 1, 1, 1]
    const [newTaskFlag, setNewTaskFlag] = useState(false)

    return (
        <div className="right-panel">
            <div className="r-p-hdr">
            {newTaskFlag && (
                    // <TaskForm flagSwap={setNewTaskFlag}/>
                    <TaskForm editId={task?.id} flagSwap={setNewTaskFlag}/>
                )}
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
                    <FontAwesomeIcon className="r-p-hdr-button" icon={faWrench} />
                    <FontAwesomeIcon className="r-p-hdr-button" icon={faX} />
                </div>
            </div>
            <div className="r-p-task-detail-type-bar">
                <FontAwesomeIcon className="r-p-hdr-button" icon={faLock} />
                This task is private to you
            </div>
            <div className="r-p-task-detail-content-box">
                {/* FORM BEGINS HERE */}
                <div className="r-p-task-detail-content-main">
                    <div className="r-p-task-detail-title-box">
                        <h1 className="task-detail-title-txt">{task?.title}</h1>
                        <FontAwesomeIcon
                            className="edit-button"
                            onClick={() => setNewTaskFlag(!newTaskFlag)}
                            icon={faPenToSquare} />
                    </div>
                    <div>
                        <div className="task-detail-info-blk">
                            <p>Assignee</p>
                            <p>{task?.task_owner?.username}</p>
                        </div>
                        <div className="task-detail-info-blk">
                            <p>Created Date</p>
                            <p>{task?.created_at}</p>
                        </div>
                        <div className="task-detail-info-blk">
                            <p>Due Date</p>
                            <p>{task?.due_date?.slice(4, 16)}</p>
                        </div>
                        <div className="task-detail-info-blk">
                            <p>Projects</p>
                            <p>{task?.project_id}</p>
                        </div>
                        <div className="task-detail-info-blk">
                            <p>Description</p>
                            <p>{task?.content}</p>
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
    )
}

export default RightPanel;