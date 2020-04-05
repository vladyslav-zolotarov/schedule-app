import React, { useContext, useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  GiBison,
  FaChartLine,
  FaQuestionCircle,
} from 'react-icons/all';
import './style.scss';
import { Link } from 'react-router-dom';
import { userContext } from '../../utils/context';

export default function Menu() {
  const { user } = useContext(userContext);
  const [styleDisabled, setStyleDisabled] = useState('');

  useEffect(() => {
    if (user === '') {
      setStyleDisabled('disabled');
    } else setStyleDisabled('');
  }, [user]);

  const disabled = (e) => {
    if (user === '') {
      e.preventDefault();
    }
  };

  return (
    <div className="menu">
      <div className="logo">
        <GiBison className="menu-logo" />
      </div>
      <div className={`main-content ${styleDisabled}`}>
        <Link to={'/'} onClick={disabled}>
          <FaCalendarAlt className="menu-icon" />
        </Link>
        <Link to={'/report'} onClick={disabled}>
          <FaChartLine className="menu-icon" />
        </Link>
      </div>
      <div className="footer">
        <FaQuestionCircle className="menu-icon" />
      </div>
    </div>
  );
}
