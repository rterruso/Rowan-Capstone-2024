import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
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
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </div>
    
  );
}

export default WelcomeUser;