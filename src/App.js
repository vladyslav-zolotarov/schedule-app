//Libraries
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

export default function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  const { pathname } = history.location;

  useEffect(() => {
    if (pathname.includes("directory")) {
      console.log(pathname);
      setSelectedDay(pathname);
    }
    setSelectedDay(null);
  }, [pathname]);

  const [tasks, setTasks] = useState([]);
  const [amountTaskBar, setAmountTaskBar] = useState([]);

  const AddNewTask = (time, action) => {
    if (selectedDay) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          date: selectedDay,
          task: {
            time: time,
            action: action
          }
        }
      ]);
    }
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
        AddTaskBar,
        selectedDay,
        amountTaskBar,
        tasks
      }}
    >
      <div className="App">
        <BrowserRouter history={history}>
          <Menu />
          <Switch>
            <Route exact path="/">
              <CalendarMonthsPage />
            </Route>
            <Route path={"/welcome"}>
              <WelcomePage />
            </Route>
            <Route path={"/directory"}>
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
