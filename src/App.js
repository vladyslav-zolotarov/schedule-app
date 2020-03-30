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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverUrl}/tasks`);
        setTasks(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const selectADay = (day) => {
    if (day !== '') {
      const newDate = dateFormat(day, 'd mmmm yyyy');
      setSelectedDay(newDate);
    } else {
      setSelectedDay(day);
    }
  };

  const addNewTask = async (time, action) => {
    if (selectedDay) {
      const task = {
        time,
        action,
      };

      try {
        const { data } = await axios.post(`${serverUrl}/tasks`, {
          id: v4(),
          date: selectedDay,
          task,
        });
        setTasks([...tasks, data]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateTask = async (id, time, action) => {
    if (selectedDay) {
      try {
        await axios.put(`${serverUrl}/tasks/${id}`, {
          date: selectedDay,
          task: { time, action },
        });
        const res = await axios.get(`${serverUrl}/tasks`);
        setTasks(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${serverUrl}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const removeTasksOfDate = (date) => {
    tasks.forEach(async (t) => {
      if (t.date === date) {
        try {
          await axios.delete(`${serverUrl}/tasks/${t.id}`);
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
  };

  return (
    <userContext.Provider value={userContextValues}>
      <div className="App">
        <Router history={history}>
          <Menu />
          <AlertBox alerts={alertFunctions.alerts} />
          {selectedDay === '' || !selectedDay ? <Redirect to={'/'} /> : null}
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
