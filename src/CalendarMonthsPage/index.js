//Libraries
import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
//Css
import './style.scss'
// import 'react-calendar/dist/Calendar.css';
//Components
import Calendar from "react-calendar";
import { userContext } from "../context";
import TopBar from "../public/TopBar";

export default function CalendarMonthsPage ()  {
    const { SelectADay, selectedDay } = useContext(userContext);

    return(
        <div className="calendar-page">
            <TopBar text={'CalendarMonthsPage'} />
            <div className="calendar-main-content">
                <Link to={`/directory/${selectedDay.toString()}`}>
                    <Calendar
                        locale="eng"
                        onClickDay={value => SelectADay(value)}
                    />
                </Link>
            </div>
        </div>
    )
};
