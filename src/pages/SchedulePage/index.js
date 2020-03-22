import React, { useContext } from "react";
import { userContext } from "utils/context";
import TopBar from "components/TopBar";
import AddButton from "components/AddButton";
import ListOfTasks from "./ListOfTasks";

import "./style.scss";

export default function SchedulePage() {
  const { selectedDay, AddNewTask } = useContext(userContext);

  return (
    <div className="schedule-page">
      <TopBar text={"SchedulePage"} />
      <div className="schedule-main-content">
        <div className="schedule-text">{selectedDay}</div>
        <ListOfTasks />
        <div onClick={() => AddNewTask()}>
          <AddButton />
        </div>
      </div>
    </div>
  );
}
