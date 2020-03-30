import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './style.scss';

export default function AddButton({ onClick }) {
  return (
    <div onClick={onClick} className="button-add">
      <FaPlusCircle />
      <p>Add new task</p>
    </div>
  );
}
