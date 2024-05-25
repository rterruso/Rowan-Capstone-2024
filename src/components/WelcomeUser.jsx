// import { useState, useEffect } from 'react';
 
// const WelcomeUser = () => {
//   const [ username, setUsername ] = useState('');

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/fetch-username');
//         const data = await response.json();
//         if (data.status == 401) {
//           alert(data.message);
//         } else if (data.status == 201) {
//           setUsername(data.username);
//         }
//       } catch (error) {
//         console.error('Error fetching movie data:', error);
//       }
//     };
//     fetchUsername();
//   }, [username]);

//   return (
//     <div className="user-welcome-container">
//       <div>
//         {username ? (
//           <p>Welcome, {username}!</p>
//         ) : (
//           <p>You are currently logged out</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WelcomeUser;

import { useContext } from 'react';
import UsernameContext from './UsernameContext.js';

function WelcomeUser() {
  const { username } = useContext(UsernameContext);
  
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