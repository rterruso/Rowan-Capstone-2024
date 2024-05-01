import { useState, useEffect } from 'react';
 
export function WelcomeUser () {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:8080/fetch-username');
        const data = await response.json();
        if (data.status == 400) {
          alert(data.message);
        } else if (data.status == 201) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchUsername();
  }, [username]);

  return (
    <div className="user-welcome-container">
      <div>
        {username ? (
          <p>Welcome, {username}!</p>
        ) : (
          <p>You are currently logged out</p>
        )}
      </div>
    </div>
  );
}

export default WelcomeUser;