import React, {useContext} from "react";
import TopBar from "../public/TopBar";
import './style.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {userContext} from "../context";


export default function ReportPage () {
    const { selectedDay, amountTaskBar, tasks  } = useContext(userContext);

    const contentTable = tasks.map((tasks, index) => {
        // console.log('date', date);
        // console.log('task', task);
        return(
            <tr key={index}>
                <td>{tasks.date}</td>
                <td>{tasks.task.time}</td>
                <td>{tasks.task.action}</td>
                <td>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" color="gray"/>
                </td>
            </tr>
        )
    })


    return(
        <div className="report-page">
            <TopBar text={'ReportPage'} />
            <div className="report-main-content">
                <h3>20 March 2020</h3>
                <table className="report-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>What to do</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {contentTable}
                    </tbody>
                </table>
            </div>
        </div>
    )
}