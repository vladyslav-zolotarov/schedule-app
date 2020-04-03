import React, { useContext } from 'react';
import './style.scss';
import { userContext } from '../../utils/context';
import { IoIosLogOut } from 'react-icons/io';

export default function TopBar({ text }) {
  const { user, setUser, setIsSignedIn } = useContext(userContext);

  const handleLogOut = () => {
    setUser({});
    setIsSignedIn(false);
  };

  return (
    <div className="top-content">
      <h3>{text}</h3>
      <div className="user-content">
        <img src={user?.imgUrl} alt="avatar" />
        <div className="user-info">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <button onClick={handleLogOut}>
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
}
