
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck, faPaperclip, faFolderTree, faLink, faThumbsUp, faClock, faEllipsis, faX, faLock, faWrench, faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faStar } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import TaskForm from "../../TaskForm";
import { useEffect, useState } from "react";
import { queryATask } from "../../../store/task";
import CommentForm from "../../CommentForm";
// import fetch from 'node-fetch';

const RightPanel = ({ id }) => {

    const task = useSelector(state => state.task[id])
    const taskTracking = useSelector(state => state.task[id]?.tracked[0])
    let looptime2 = [1, 1, 1, 1, 1]
    const [newTaskFlag, setNewTaskFlag] = useState(false)
    const [commentList, setCommentList] = useState([])
    const [commentBoxToggle, setCommentBoxToggle] = useState(false)
    const [tracked, setTracked] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setCommentList(task?.comments?.reverse())
    }, [id, task])

    // console.log(task.tracked[0].is_tracked)
    if (!task?.tracked[0]) {
        console.log('not trackin this one')
    } else {
        console.log('tracking this one')
    }

    const [content, setContent] = useState('');

    
    const toggleComment = (v) => {
        setCommentBoxToggle(v)
    }
    
    const checkID = () => {
        if (id) {
            setCommentBoxToggle(!commentBoxToggle)
        }
    }

    const updateAComment = async (e) => {
        e.preventDefault();
        // let url = `/api/tasks/comments/${}`
    }
    //////////////////////////////
    const trackTask = async () => {
        await fetch(`/api/tasks/track/${id}`, {method : 'POST'})
        dispatch(queryATask(id))
    }

    const untrackTask = async () => {
        await fetch(`/api/tasks/untrack/${id}`, {method : 'DELETE'})
        dispatch(queryATask(id))
    }

    return (
        <div className="right-panel">
            <div className="r-p-hdr">
                {newTaskFlag && (
                    // <TaskForm flagSwap={setNewTaskFlag}/>
                    <TaskForm editId={task?.id} flagSwap={setNewTaskFlag} />
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
                {taskTracking != undefined 
                    ? <FontAwesomeIcon className="r-p-hdr-button" 
                    icon={filledStar} 
                    onClick={() => untrackTask()}/>
                    : <FontAwesomeIcon className="r-p-hdr-button" 
                    icon={faStar} 
                    onClick={() => trackTask()}/>
                }
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
                        {commentBoxToggle && (
                            <CommentForm id={task?.id} toggleComment={toggleComment}/>
                        )}
                        <div className="task-comment-list-box">
                            <h2
                            onClick={() => checkID()}
                            >comment box</h2>
                            {commentList?.map((comment) => (
                                <div className="task-comment-bx">
                                    <div className="cmnt-profile-blk">
                                        <div className="profile-icon-block"></div>
                                        <p>{comment?.comment_owner?.username}</p>
                                    </div>
                                    <p className="cmnt-ctnt-blk">{comment?.content}</p>
                                    <p>{comment?.created_at}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightPanel;