import { useState, useEffect } from 'react';


export function WelcomeUser() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:8080/fetch-username');
        const data = await response.json();
        if (data.status === 200) {
          setUsername(data.username);
        } else {
          console.error(data.message); // Log error message from the server
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (!username) {
      fetchUsername(); // Fetch only if username isn't already set
    }
  }, [username]); // Remove username from dependency array if you don't want continuous polling

  return (
    <div className="user-greeting">
      {username ? <h1>Welcome, {username}</h1> : <h1>Sign in</h1>}
    </div>
  );
}

export default WelcomeUser;