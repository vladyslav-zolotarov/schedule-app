//Libraries
import React from "react";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat/lib/dateformat";
//Css
import "./style.scss";
// import 'react-calendar/dist/Calendar.css';
//Components
import Calendar from "react-calendar";
import TopBar from "components/TopBar";

export default function CalendarMonthsPage() {
  const history = useHistory();

  const handleDayClick = day => {
    history.push(`/directory/${dateFormat(day, "dd-mm-yyyy")}`);
  };

  return (
    <div className="calendar-page">
      <TopBar text={"CalendarMonthsPage"} />
      <div className="calendar-main-content">
        <Calendar locale="eng" onClickDay={handleDayClick} />
      </div>
    </div>
  );
}
