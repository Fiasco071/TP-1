import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
// import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import './style.css'
import MyCalendar from '../MyCalendar';



const DashBoardTest = () => {
    const loop = [1, 1, 1, 1, 1, 1]
    const colorLoop = [0, 1, 2, 3, 4, 5]
    const colorLoop2 = [0, 1, 2, 3, 4, 5]


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

    //   useEffect(()=> {
    //   },[])

    return (
        <div className="dashb-wrapper">
            <div className='dashb-header'></div>
            <div className='dashb-body'>
                <div className='dashb-nav-bar'></div>
                <div className='dashb-content'>
                    <div className='dashb-content-filter-bar'>
                        <p className='filter-button-txt filter-clicked'>dashboard</p>
                        <p className='filter-button-txt'>tasks</p>
                        <p className='filter-button-txt'>projects</p>
                        <p className='filter-button-txt'>messages</p>
                        <p className='filter-button-txt'>resource 1</p>
                        <p className='filter-button-txt'>resource 2</p>
                    </div>
                    <div className='dashb-content-widget-wrapper'>
                        <div className=''>
                            {/* THIS NEEDS TO BE CUT INTO COMPONENT  */}
                            <div className='tasks-widget-box'>
                                <div>
                                    <div className='recent-tasks-box'>
                                        <h2 className='widget-box-title-txt'>recently created tasks</h2>
                                        <div className='widget-content-wrapper'>
                                            {loop.map((stuff, idx) => (
                                                <div className='db-sing-task'>
                                                    <p className='db-sing-task-title-txt'> a task to do</p>
                                                    <div className='db-sing-task-tag-date'>
                                                        <p className={`db-sing-task-tag-txt color-${colorLoop[idx]}`}>project1</p>
                                                        <p className={`db-sing-task-tag-txt  color-${colorLoop2[idx]}`}>sometag</p>
                                                        <p className='db-sing-task-dd-txt'> 2022-08-30</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='recent-tasks-box'>
                                        <h2 className='widget-box-title-txt'>due today</h2>
                                        <div className='widget-content-wrapper'>
                                            {loop.map((stuff, idx) => (
                                                <div className='db-sing-task'>
                                                    <p className='db-sing-task-title-txt'> a task to do</p>
                                                    <div className='db-sing-task-tag-date'>
                                                        <p className={`db-sing-task-tag-txt color-${colorLoop[idx]}`}>project1</p>
                                                        <p className={`db-sing-task-tag-txt  color-${colorLoop2[idx]}`}>sometag</p>
                                                        <p className='db-sing-task-dd-txt'> 2022-08-30</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='calendar-box'>
                                    <h2 className='widget-box-title-txt'>calendar</h2>
                                    <MyCalendar />
                                </div>

                            </div>
                            {/* END */}

                            <div className='tracker-box'>
                                <div className='tracked-tl-box'>
                                    <h2 className='widget-box-title-txt'>tracked tasks</h2>

                                </div>
                            </div>
                        </div>
                        <div className='project-box'></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashBoardTest