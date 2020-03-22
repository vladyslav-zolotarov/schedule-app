//Libraries
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { history } from 'utils/history'

//Css
import './style.scss'
//Components
import Menu from 'components/Menu'
import CalendarMonthsPage from 'pages/CalendarMonthsPage'
import WelcomePage from 'pages/WelcomePage'
import SchedulePage from 'pages/SchedulePage'
import { userContext } from 'utils/context'
import ReportPage from 'pages/ReportPage'
import dateFormat from 'dateformat/lib/dateformat'
import { v4 } from 'uuid'

export default function App() {
  // const { pathname } = history.location;
  //
  // useEffect(() => {
  //   if (pathname.includes("directory")) {
  //     console.log(pathname);
  //     setSelectedDay(pathname);
  //   }
  //   setSelectedDay(null);
  // }, [pathname]);

  const [tasks, setTasks] = useState([])
  const [selectedDay, setSelectedDay] = useState('')

  useEffect(() => {
    console.log(tasks, '')
  }, [tasks])

  const selectADay = day => {
    if (day !== '') {
      const newDate = dateFormat(day, 'd mmmm yyyy')
      setSelectedDay(newDate)
    } else {
      setSelectedDay(day)
    }
  }

  const addNewTask = () => {
    if (selectedDay) {
      setTasks([
        ...tasks,
        {
          id: v4,
          date: selectedDay,
          task: {
            time: '',
            action: '',
          },
        },
      ])
    }
  }

  const updateNewTask = (id, time, action) => {
    if (selectedDay) {
      const updatedTasks = tasks.map(t => {
        if (t.id === id) {
          return (t = { id, date: selectedDay, tasks: { time, action } })
        }
        return t
      })

      setTasks(updatedTasks)
    }
  }

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

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
          </Switch>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  )
}
