import { useState } from "react"
import './style.css'

const Dashboard = () => {

    const [flag, setFlag] = useState(false)

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
                    <div className=""></div>
                </div>
                <div className="viewport-blk">

                </div>
            </div>
            <div className="dashb-ftr-blck">

            </div>
        </div>
    )
}

export default Dashboard