import React, { useContext } from 'react'
import Task from './Task'
import './style.scss'
import { userContext } from 'utils/context'

export default function ListOfTasks() {
  const { selectedDay, tasks } = useContext(userContext)

  const content = tasks.map((task, index) => {
    if (task.date === selectedDay) {
      return (
        <li key={index}>
          <Task id={task.id} />
        </li>
      )
    } else return null
  })

  return <ul className="list-of-task-main-content">{content}</ul>
}
