import React, { useContext, useState } from "react";
import "./style.scss";
import "components/TimePicker/style.scss";
import { FaTrashAlt } from "react-icons/all";

import { userContext } from "utils/context";

export default function Task ({ id }) {
  const [actionValue, setActionValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [disableValue, setDisableValue] = useState(false);

  const { AddNewTask, UpdateNewTask } = useContext(userContext);

  const onSubmit = e => {
    e.preventDefault();
    if (timeValue !== "" && actionValue !== "") {
        UpdateNewTask(id, timeValue, actionValue);
        setDisableValue(true);
    }
  };

  return (
    <form className="task-main-content">
      <div className="time-picker">
        <input
          disabled={disableValue}
          value={timeValue}
          onChange={e => setTimeValue(e.target.value)}
          className="input-picker"
          placeholder="ww"
          type="time"
        />
      </div>
      <input
        disabled={disableValue}
        value={actionValue}
        onChange={e => setActionValue(e.target.value)}
        className="task-input"
        type="text"
        placeholder="Input task"
      />
      <button
        type="submit"
        className="task-butt"
        disabled={disableValue}
        onClick={e => onSubmit(e)}
      >
        Add
      </button>
        <button
            type="submit"
            className="task-butt"
            onClick={e => onSubmit(e)}
        >
            <FaTrashAlt />
        </button>
    </form>
  );
}
