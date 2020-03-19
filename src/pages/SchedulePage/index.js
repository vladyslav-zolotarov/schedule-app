import React, { useContext } from "react";
import { userContext } from "utils/context";
import TopBar from "components/TopBar";
import AddButton from "components/AddButton";
import ListOfTasks from "./ListOfTasks";

import "./style.scss";

export default function SchedulePage() {
  const { selectedDay, AddTaskBar } = useContext(userContext);

  return (
    <div className="schedule-page">
      <TopBar text={"SchedulePage"} />
      <div className="schedule-main-content">
        <div className="schedule-text">{selectedDay?.toString()}</div>
        <ListOfTasks />
        <div onClick={() => AddTaskBar()}>
          <AddButton />
        </div>
      </div>
    </div>
  );
}
