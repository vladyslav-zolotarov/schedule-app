import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { history } from 'utils/history';
import axios from 'axios';

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
import { useAlert } from './utils/alertContext';
import AlertBox from './components/AlertBox';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedReportDay, setSelectedReportDay] = useState('');
  const alertFunctions = useAlert();
  const serverUrl = 'http://localhost:8000';

  // let history = useHistory();

  // useEffect(() => history.push('/'), []);

  useEffect(() => {
    axios.get(`${serverUrl}/tasks`).then((res) => {
      const task = res.data;
      setTasks({ gotTask: task });
    });
  }, [tasks]);

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
      // setTasks([
      //   ...tasks,
      //   {
      //     id: v4(),
      //     date: selectedDay,
      //     task: {
      //       time,
      //       action,
      //     },
      //   },
      // ]);
      const task = {
        time,
        action,
      };
      axios
        .post(`${serverUrl}/tasks`, { id: v4(), date: selectedDay, task })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const updateNewTask = (id, time, action) => {
    if (selectedDay) {
      tasks.gotTask.map((t) => {
        if (t.id === id) {
          t = { id, date: selectedDay, task: { time, action } };
          axios
            .put(`${serverUrl}/tasks/${id}`, t)
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));
        }
      });
    }
  };

  const removeTask = (id) => {
    axios
      .delete(`${serverUrl}/tasks/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const removeTasksOfDate = (date) => {
    tasks.gotTask.map((t) => {
      if (t.date === date) {
        axios
          .delete(`${serverUrl}/tasks/${t.id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    });
  };

  const onSelectReportDay = (id) => {
    setSelectedReportDay(id);
  };

  const userContextValues = {
    addNewTask,
    selectedDay,
    tasks,
    selectADay,
    removeTask,
    updateNewTask,
    onSelectReportDay,
    selectedReportDay,
    removeTasksOfDate,
    alertFunctions,
  };

  return (
    <userContext.Provider value={userContextValues}>
      <div className="App">
        <Router history={history}>
          <Menu />
          {/*<Redirect to={'/'} />*/}
          <AlertBox alerts={alertFunctions.alerts} />
          {/*{selectedDay === '' || selectedDay ? <Redirect to={'/'} /> : null}*/}
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
        </Router>
      </div>
    </userContext.Provider>
  );
}
