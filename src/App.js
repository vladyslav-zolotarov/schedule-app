import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { history } from 'utils/history';

import './style.scss';

import Menu from 'components/Menu';
import CalendarMonthsPage from 'pages/CalendarMonthsPage';
import WelcomePage from 'pages/WelcomePage';
import SchedulePage from 'pages/SchedulePage';
import { userContext } from 'utils/context';
import ReportPage from 'pages/ReportPage';
import dateFormat from 'dateformat/lib/dateformat';
import ReportTask from './pages/ReportPage/ReportTask';
import { v4 } from 'uuid';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedReportDay, setSelectedReportDay] = useState('');
  // const [countTasks, setCountTasks] = useState(0);

  const selectADay = (day) => {
    if (day !== '') {
      const newDate = dateFormat(day, 'd mmmm yyyy');
      setSelectedDay(newDate);
    } else {
      setSelectedDay(day);
    }
  };

  const addNewTask = (time, action) => {
    if (selectedDay) {
      setTasks([
        ...tasks,
        {
          id: v4(),
          date: selectedDay,
          task: {
            time,
            action,
          },
        },
      ]);
    }
  };

  const updateNewTask = (id, time, action) => {
    if (selectedDay) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === id) {
          return (t = { id, date: selectedDay, task: { time, action } });
        }
        return t;
      });
      setTasks(updatedTasks);
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const removeTasksOfDate = (date) => {
    setTasks(tasks.filter((task) => task.date !== date));
  };

  const onSelectReportDay = (id) => {
    setSelectedReportDay(id);
  };

  // const refactorTasks = (refactored) => {
  //   setTasks(refactored);
  // };

  // const onCountTasks = (date) => {
  //   tasks.map((task) => {
  //     if (
  //       task.date === date &&
  //       task.task.time !== '' &&
  //       task.task.action !== ''
  //     )
  //       setCountTasks(countTasks + 1);
  //   });
  // };

  return (
    <userContext.Provider
      value={{
        addNewTask,
        // addTaskBar,
        selectedDay,
        tasks,
        selectADay,
        removeTask,
        updateNewTask,
        onSelectReportDay,
        selectedReportDay,
        removeTasksOfDate,
        // refactorTasks,
        // countTasks,
        // setCountTasks,
        // onCountTasks,
      }}
    >
      <div className="App">
        <BrowserRouter history={history}>
          <Menu />
          {selectedDay === '' ? <Redirect to={'/'} /> : null}
          <Switch>
            <Route exact path="/">
              <CalendarMonthsPage />
            </Route>
            <Route path={'/welcome'}>
              <WelcomePage />
            </Route>
            <Route path={'/day'}>
              <SchedulePage />
            </Route>
            <Route path={'/report'}>
              <ReportPage />
            </Route>
            <Route path={`/report-day/${selectedReportDay}`}>
              <ReportTask />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}
