import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dateFormat from 'dateformat/lib/dateformat';
import './style.scss';
import Calendar from 'react-calendar';
import TopBar from 'components/TopBar';
import { userContext } from '../../utils/context';

export default function CalendarMonthsPage() {
  const history = useHistory();
  const { selectADay } = useContext(userContext);

  // useEffect(() => {
  //   const newTasks = tasks.filter(
  //     (t) => t?.task?.time !== '' && t?.task?.action !== '',
  //   );
  //   refactorTasks(newTasks);
  // }, []);

  const handleDayClick = (day) => {
    history.push(`/day/${dateFormat(day, 'd mmmm yyyy')}`);
    selectADay(day);
  };

  return (
    <div className="calendar-page">
      <TopBar text={'Calendar Months Page'} />
      <div className="calendar-main-content">
        <Calendar locale="eng" onClickDay={handleDayClick} />
      </div>
    </div>
  );
}
