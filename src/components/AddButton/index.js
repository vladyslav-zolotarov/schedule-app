import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import './style.scss'

export default function AddButton() {
  return (
    <>
      <button className="button-add">
        <FaPlusCircle size={20} color="white" />
        <p>Add new task</p>
      </button>
    </>
  )
}
