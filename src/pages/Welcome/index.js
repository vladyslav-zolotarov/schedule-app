//Libraries
import React, { useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import './style.scss';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';

export default function WelcomePage() {
  const { user, setUser, isSignedIn, setIsSignedIn } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    if (user?.name && user?.email && user?.imgUrl) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const responseGoogle = (response) => {
    setIsSignedIn(true);
    setUser({
      name: response.profileObj.name,
      email: response.profileObj.email,
      imgUrl: response.profileObj.imageUrl,
    });
  };

  return (
    <div className="welcome-content">
      <h3>Login with help Google</h3>
      <GoogleLogin
        clientId="213895154902-8kj732peqg9davaln3dthinmttn0eh4d.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={isSignedIn}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}
