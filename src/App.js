import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from 'utils/history';

import './style.scss';

import Menu from 'components/Menu';
import CalendarMonthsPage from 'pages/CalendarMonths';
import WelcomePage from 'pages/Welcome';
import SchedulePage from 'pages/Schedule';
import { userContext } from 'utils/context';
import ReportPage from 'pages/Report';
import dateFormat from 'dateformat/lib/dateformat';
import ReportTask from './pages/Report/ReportTask';
import { useAlert } from './utils/alertContext';
import AlertBox from './components/AlertBox';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskAction,
} from './api/endpoints';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedReportDay, setSelectedReportDay] = useState('');
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(true);
  const alertFunctions = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const selectADay = (day) => {
    if (day !== '') {
      const newDate = dateFormat(day, 'yyyy-mm-dd');
      setSelectedDay(newDate);
    } else {
      setSelectedDay(day);
    }
  };

  const addNewTask = async (time, action) => {
    if (selectedDay) {
      try {
        const date = dateFormat(selectedDay, 'yyyy-mm-dd');
        const { data } = await createTask(date, time, action);
        setTasks([...tasks, data]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateTask = async (id, time, action) => {
    if (selectedDay) {
      try {
        await updateTaskAction(id, selectedDay, time, action);
        const res = await getTasks();
        setTasks(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const removeTasksOfDate = (date) => {
    tasks.forEach(async (t) => {
      if (t.date === date) {
        try {
          await deleteTask(t.id);
          setTasks(tasks.filter((task) => task.date !== date));
        } catch (e) {
          console.error(e);
        }
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
    updateNewTask: updateTask,
    onSelectReportDay,
    selectedReportDay,
    removeTasksOfDate,
    alertFunctions,
    setUser,
    user,
    isSignedIn,
    setIsSignedIn,
  };

  return (
    <userContext.Provider value={userContextValues}>
      <div className="App">
        <Router history={history}>
          <Menu />
          <AlertBox alerts={alertFunctions.alerts} />
          {/*{selectedDay === '' || !selectedDay ? <Redirect to={'/'} /> : null}*/}
          {!user?.name && !user?.email && !user?.imgUrl ? (
            <Redirect to={'/welcome'} />
          ) : null}
          <Switch>
            <Route path={'/welcome'}>
              <WelcomePage />
            </Route>
            <Route exact path="/">
              <CalendarMonthsPage />
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
