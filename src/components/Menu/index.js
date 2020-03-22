import React from 'react'
import {
  FaCalendarAlt,
  GiBison,
  FaChartLine,
  FaQuestionCircle,
} from 'react-icons/all'
import './style.scss'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <div className="logo">
        <Link to={'/welcome'}>
          <GiBison className="menu-icon" />
        </Link>
      </div>
      <div className="main-content">
        <Link to={'/'}>
          <FaCalendarAlt className="menu-icon" />
        </Link>
        <Link to={'/report'}>
          <FaChartLine className="menu-icon" />
        </Link>
      </div>
      <div className="footer">
        <FaQuestionCircle className="menu-icon" />
      </div>
    </div>
  )
}
