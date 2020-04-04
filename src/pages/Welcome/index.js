import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import './style.scss';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';

export default function WelcomePage() {
  const { setUser } = useContext(userContext);
  const history = useHistory();

  const handleSuccess = (res) => {
    localStorage.setItem('token', res.tokenObj.access_token);
    localStorage.setItem('user', JSON.stringify(res.profileObj));
    const { name, email, imageUrl } = res.profileObj;

    console.log(res);

    setUser({ name, email, imageUrl });
  };

  const handleFail = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    setUser(null);
  };

  if (localStorage.getItem('token')) {
    history.push('/');
  }

  return (
    <div className="welcome-content">
      <div>
        <h3>Login with help Google</h3>
        <GoogleLogin
          clientId="213895154902-8kj732peqg9davaln3dthinmttn0eh4d.apps.googleusercontent.com"
          onSuccess={handleSuccess}
          onFailure={handleFail}
          isSignedIn={localStorage.getItem('token')}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}
