import { useState, useEffect } from 'react';

const WelcomeUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user information from backend API
    const fetchData = async () => { 
      await fetch('http://localhost:8080/fetch-user')
        .then(response => response.json())
        .then(data => {
          if (data.status == 400) {
            alert (data.message);
          } else if (data.status == 201) {
            setUsername(data.username);
            alert ("username sueccesfuuly aquired");
          }
          console.log(data); // Log the response from fetch-user endpoint
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    };
    fetchData();
  }, [username]);

  return (
    <div>
        <p>Welcome, {username}!</p>
    </div>
  );
};

export default WelcomeUser;
