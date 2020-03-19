import React, { useContext } from "react";
import Task from "./Task";
import "./style.scss";
import { userContext } from "utils/context";

export default function ListOfTasks() {
  const { amountTaskBar, selectedDay } = useContext(userContext);

  const content = amountTaskBar.map((task, index) => {
    if (task.id === selectedDay) {
      return <Task />;
    } else return null;
  });

  return <div className="list-of-task-main-content">{content}</div>;
}
