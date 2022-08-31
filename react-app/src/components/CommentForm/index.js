import { useState } from "react";
import { useDispatch } from "react-redux";
import { queryATask } from "../../store/task";
import './style.css'

const CommentForm = ({ id }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const addAComment = async (e) => {
        e.preventDefault();
        let url = `/api/tasks/${id}/comments/new`
        let data = {
            content,
            task_id: id,
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const createComment = await fetch(url, options)
        dispatch(queryATask(id))
    }



    return (
        <div className="comment-box">
            <h2 className="form-box-txt">
                write a comment
            </h2>
            <div>
                <div className="comment-content-box">
                    <form>
                        <label>comment</label>
                        <textarea
                            name="content"
                            className="comment-input-box"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <input
                            type='hidden'
                            value={id}
                            name='task_id'
                        ></input>
                    </form>
                </div>
                <div className="comment-button-box">
                    <button
                        className="cancel-button">cancel</button>
                    <button
                        onClick={(e) => addAComment(e)}
                        className={`submit-button ${content.length > 0 ? 'on' : 'off'}`}>comment</button>
                </div>
            </div>
        </div>

    )
}

export default CommentForm