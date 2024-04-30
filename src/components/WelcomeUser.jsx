import { useContext } from 'react';
import { UsernameContext } from '../pages/Login.jsx';

function WelcomeUser () {
  const username = useContext(UsernameContext);
  alert (username);

  return (
    <div className="user-welcome-container">
      <div>
        {username ? (
          <p>Welcome, {username}!</p>
        ) : (
          <p>Username is not set</p>
        )}
      </div>
    </div>
  );
}

export default WelcomeUser;