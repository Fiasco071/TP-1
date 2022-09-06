import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faPowerOff } from "@fortawesome/free-solid-svg-icons";
// import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import './style.css'
import MyCalendar from '../MyCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { dataCallTasks } from '../../store/task';
import moment from 'moment'

import img1 from '../../img/pj1.jpg';
import Dashboard from '../Dashboard';
import { logout } from '../../store/session';

const DashBoardTest = () => {
    const loop = [1, 1, 1, 1, 1, 1]
    const colorLoop = [0, 1, 2, 3, 4, 5]
    const colorLoop2 = [0, 1, 2, 3, 4, 5]
    const [trackedList, setTrackedList] = useState([])

    const dispatch = useDispatch();
    const [dbFilter, setDbFilter] = useState('dashboard')
    const [taskID, setTaskID] = useState();
    // const trackedList = useSelector(state => state.session.user.tracked_tasks)
    const tasks = useSelector(state => Object.values(state?.task))
    const filteredTasks = tasks?.filter(task => task?.active === true)

    // console.log(trackedList)

    const isToday = (date) => {
        const today = new Date()
        return date.getFullYear() == today.getFullYear() &&
            date.getMonth() == today.getMonth() &&
            date.getDate() + 1 == today.getDate()
    }

    const dueTodayTasks = tasks?.filter(task => {
        const date = new Date(task?.due_date)
        return isToday(date)
    })


    const calendarTasksList = tasks?.map(task => {
        let data = {
            start: moment(task?.due_date).add(1, 'days'),
            end: moment(task?.due_date).add(1, 'days'),
            title: task?.title
        }
        return (data)
    })
    useEffect(() => {
        dispatch(dataCallTasks())
        tracked()
    }, [dispatch, dbFilter])

    const tracked = async () => {
        const response = await fetch('/api/tasks/track')
        const data = await response.json();
        setTrackedList(data.tracks)
    }

    // console.log(trackedList)
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    shuffle(colorLoop)
    shuffle(colorLoop2)

    const taskCardClick = (id) => {
        setDbFilter('tasks')
        setTaskID(id)
    }

    // let come up with a logic for slider 
    // there will be 3 cases
    // 1. less than 5
    // 2. more than 5
    // 3. 5

    // there are 24 tracked tasks

    // we can create a state variable to hold something [0]  Intialize it with 0
    // if the list length is longer than 5 than ...
    //     we can set it to 1 and display first 5  -> update [5]
    //     we repeat this while variable[] < list length




    return (
        <div className="dashb-wrapper">
            <div className='dashb-header'></div>
            <div className='dashb-body'>
                <div className='dashb-nav-bar'>
                    <div className="log-out-button"
                        onClick={() => dispatch(logout())}>
                            log out
                    </div>
                </div>
                <div className='dashb-content'>
                    <div className='dashb-content-filter-bar'>
                        <p className={`filter-button-txt ${dbFilter == 'dashboard' ? 'filter-clicked' : ''}`} onClick={() => setDbFilter('dashboard')}>dashboard</p>
                        <p className={`filter-button-txt ${dbFilter == 'tasks' ? 'filter-clicked' : ''}`} onClick={() => setDbFilter('tasks')}>tasks</p>
                        <p className={`filter-button-txt ${dbFilter == 'projects' ? 'filter-clicked' : ''}`} onClick={() => setDbFilter('projects')}>projects</p>
                        <p className={`filter-button-txt ${dbFilter == 'messages' ? 'filter-clicked' : ''}`} onClick={() => setDbFilter('messages')}>messages</p>
                    </div>
                    {dbFilter === 'dashboard' && (
                        <div className='dashb-content-widget-wrapper'>
                            <div className=''>
                                {/* THIS NEEDS TO BE CUT INTO COMPONENT  */}
                                <div className='tasks-widget-box'>
                                    <div>
                                        <div className='recent-tasks-box'>
                                            <h2 className='widget-box-title-txt'>recently created tasks</h2>
                                            <div className='widget-content-wrapper'>
                                                {filteredTasks?.map((task, idx) => (
                                                    <div className='db-sing-task' key={idx}>
                                                        <p className='db-sing-task-title-txt'>{task?.title.slice(0, 18)}{task?.title.length > 18 ? '...' : ''}</p>
                                                        <div className='db-sing-task-tag-date'>
                                                            <p className={`db-sing-task-tag-txt color-${colorLoop[idx]}`}>{task?.project_detail.title.slice(0, 8)}</p>
                                                            <p className={`db-sing-task-tag-txt  color-${colorLoop2[idx]}`}>sometag</p>
                                                            <p className='db-sing-task-dd-txt'>
                                                                {`${new Date(task?.due_date).getFullYear()} / 
                                                            ${new Date(task?.due_date).getMonth() + 1 < 10 ? '0' + (new Date(task?.due_date).getMonth() + 1) : new Date(task?.due_date).getMonth() + 1} /
                                                            ${new Date(task?.due_date).getDate() < 10 ? '0' + (new Date(task?.due_date).getDate() + 1) : new Date(task?.due_date).getDate() + 1}`}

                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='recent-tasks-box'>
                                            <h2 className='widget-box-title-txt'>due today</h2>
                                            <div className='widget-content-wrapper'>
                                                {dueTodayTasks?.map((task, idx) => (
                                                    <div className='db-sing-task' key={idx}>
                                                        <p className='db-sing-task-title-txt'>{task?.title.slice(0, 18)}{task?.title.length > 18 ? '...' : ''}</p>
                                                        <div className='db-sing-task-tag-date'>
                                                            <p className={`db-sing-task-tag-txt color-${colorLoop[idx]}`}>{task?.project_detail.title.slice(0, 8)}</p>
                                                            <p className={`db-sing-task-tag-txt  color-${colorLoop2[idx]}`}>sometag</p>
                                                            <p className='db-sing-task-dd-txt'>
                                                                {`${new Date(task?.due_date).getFullYear()} / 
                                                            ${new Date(task?.due_date).getMonth() + 1 < 10 ? '0' + (new Date(task?.due_date).getMonth() + 1) : new Date(task?.due_date).getMonth() + 1} /
                                                            ${new Date(task?.due_date).getDate() < 10 ? '0' + (new Date(task?.due_date).getDate() + 1) : new Date(task?.due_date).getDate() + 1}`}

                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='calendar-box'>
                                        <h2 className='widget-box-title-txt'>calendar</h2>
                                        {calendarTasksList.length > 0 && (
                                            <MyCalendar events={calendarTasksList} />
                                        )}
                                    </div>

                                </div>
                                {/* END */}

                                <div className='tracker-box'>
                                    <div className='tracked-tl-box'>
                                        <h2 className='widget-box-title-txt'>tracked tasks</h2>

                                        <div className='ttl-content'>
                                            <FontAwesomeIcon icon={faCaretLeft} />
                                            <div className='ttl-content-blk'>
                                                {trackedList?.map(task => (
                                                    <div className='ttl-card-box'
                                                        onClick={() => taskCardClick(task.task_detail.id)}
                                                    >
                                                        <img
                                                            className='ttl-card-img'
                                                            src={img1} />
                                                        <h2 className='ttl-card-box-title'>
                                                            {task.task_detail.title.slice(0, 8)}{task.task_detail.title.length > 6 ? '...' : ''}
                                                        </h2>
                                                        <div className='dd-txt-wrapper'>
                                                            <h2 className='ttl-card-box-dd'>
                                                                {moment(task.task_detail.due_date).format('MMM Do')}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                            <FontAwesomeIcon icon={faCaretRight} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='project-box'></div>
                        </div>
                    )}
                    {dbFilter === 'tasks' && (
                        <Dashboard tId={taskID}/>
                    )}
                </div>
            </div>
        </div >
    )
}

export default DashBoardTest