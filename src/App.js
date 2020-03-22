//Libraries
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { history } from "utils/history";

//Css
import "./style.scss";
//Components
import Menu from "components/Menu";
import CalendarMonthsPage from "pages/CalendarMonthsPage";
import WelcomePage from "pages/WelcomePage";
import SchedulePage from "pages/SchedulePage";
import { userContext } from "utils/context";
import ReportPage from "pages/ReportPage";
import dateFormat from 'dateformat/lib/dateformat'

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

  const [tasks, setTasks] = useState([]);
  const [amountTaskBar, setAmountTaskBar] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');


  const SelectADay = day =>{
    if (day !== ''){
      const newDate = dateFormat(day, 'd mmmm yyyy');
      setSelectedDay(newDate);
    } else {
      setSelectedDay(day)
    }
  };

  const AddNewTask = () => {
    if (selectedDay) {
      setTasks([
        ...tasks,

        {
          id: Date.now(),
          date: selectedDay,
          task: {
            time: '',
            action: ''
          }
        }
      ]);
    }
  };

  const UpdateNewTask = (id, time, action) => {
    console.log('id', id);
    console.log('time', time);
    console.log('action', action);

    if (selectedDay) {
      console.log('tasks.id', tasks)
      const cont = tasks.map(t => {
        if(t.id === id){
          return [{id: id, date: selectedDay, tasks: { time: time, action: action }}]
        }
      });

      console.log(cont)

      setTasks([
        ...tasks,
        cont
      ]);
    }



  };


  const RemoveTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  };


  const AddTaskBar = () => {
    if (selectedDay) {
      setAmountTaskBar([
        ...amountTaskBar,
        {
          id: selectedDay,
          task: "task"
        }
      ]);
    }
  };

  return (
    <userContext.Provider
      value={{
        AddNewTask,
        // AddTaskBar,
        selectedDay,
        // amountTaskBar,
        tasks,
        SelectADay, RemoveTask, UpdateNewTask
      }}
    >
      <div className="App">
        <BrowserRouter history={history}>
          <Menu />
          {selectedDay === '' ? (
              <Redirect to={'/'} />
          ) : null}
          <Switch>
            <Route exact path="/">
              <CalendarMonthsPage />
            </Route>
            <Route path={"/welcome"}>
              <WelcomePage />
            </Route>
            <Route path={"/day"}>
              <SchedulePage />
            </Route>
            <Route path={"/report"}>
              <ReportPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}
