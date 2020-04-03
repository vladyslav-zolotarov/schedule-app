import React, { useContext } from 'react';
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

  const disabled = (e) => {
    if (!user?.name && !user?.email && !user?.imgUrl) {
      e.preventDefault();
    }
  };

  return (
    <div className="menu">
      <div className="logo">
        {/*<Link to={'/welcome'}>*/}
        <GiBison className="menu-logo" />
        {/*</Link>*/}
      </div>
      <div className="main-content">
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
