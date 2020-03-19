//Libraries
import React, {createContext, useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//Css
import './style.scss'
//Components
import Menu from "./public/Menu";
import CalendarMonthsPage from "./CalendarMonthsPage";
import WelcomePage from "./WelcomePage";
import SchedulePage from "./SchedulePage";
import { userContext } from "./context";
import  dateFormat  from 'dateformat/lib/dateformat'
import ReportPage from "./ReportPage";


export default function App() {

    const [ selectedDay, setSelectedDay ] = useState('');
    const [ tasks, setTasks ] = useState([]);
    const [ amountTaskBar, setAmountTaskBar ] = useState([]);

    const [ s, setS ] = useState(false)


    const SelectADay = day =>{
        if (day !== ''){
            const newDate = dateFormat(day, 'd mmmm yyyy');
            setSelectedDay(newDate);
        } else {
            setSelectedDay(day)
        }
    };

    const AddNewTask = (time, action) => {
        if(selectedDay !== '') {
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
            ])
        }
    };

    const AddTaskBar = () => {
        if(selectedDay !== ''){
            setAmountTaskBar([
                ...amountTaskBar,{
                    id: selectedDay,
                    task: 'task'
                }
            ]);
        }
    };

  return (
      <userContext.Provider value={{
          SelectADay, AddNewTask, AddTaskBar,
          selectedDay, amountTaskBar, tasks ,
          setS
      }}>
        <div className="App">
            <Menu />
            <BrowserRouter>
                {/*{selectedDay === '' ? (*/}
                {/*    <Redirect exact to={"/"} />*/}
                {/*) : null}*/}
                {/*{s ? (*/}
                {/*    <Redirect exact to={"/report"} />*/}
                {/*): null}*/}
                <Switch>
                    <Route exact path={'/'}>
                        <CalendarMonthsPage />
                    </Route>
                    <Route path={'/welcome'}>
                        <WelcomePage />
                    </Route>
                    <Route path={'/directory'}>
                        <SchedulePage />
                    </Route>
                    <Route path={'/report'}>
                        <ReportPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
      </userContext.Provider>
  );
}

