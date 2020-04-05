import React, { useContext } from 'react';
import './style.scss';
import { userContext } from '../../utils/context';
import { GoogleLogout } from 'react-google-login';
import { IoIosLogOut } from 'react-icons/io';

export default function TopBar({ text }) {
  const { user, setUser } = useContext(userContext);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    setUser('');
  };

  return (
    <div className="top-content">
      <h3>{text}</h3>
      <div className="user-content">
        <img src={user?.imageUrl} alt="avatar" />
        <div className="user-info">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <GoogleLogout
          clientId="213895154902-8kj732peqg9davaln3dthinmttn0eh4d.apps.googleusercontent.com"
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>
              <IoIosLogOut />
            </button>
          )}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        ></GoogleLogout>
      </div>
    </div>
  );
}
