/** 
 * 
 * Register.jsx
 * 
 * Osman Elias
 * 
 * 4/24/2024
 * 
 *  Register logic and html to generate the page
 * 
*/

import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      console.error("Passwords don't match.");
      return;
    }

    const registerData = {
      username: username,
      email: email,
      password: password,
    };

    const options = {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      },
      body: JSON.stringify(registerData) // Convert data object to JSON string
      // credentials: 'include' // SCREWED UP THE FETCH RANDOMLY Needed for cookies 
    };

    await fetch('http://localhost:8080/register', options)
      .then(response => response.json())
      .then(data => {
        if (data.status == 400) {
          alert (data.message);
        } else if (data.status == 201){
          alert(data.message);
          window.location.href = '/Login';
        }

        console.log (data);
        // Handle successful response (e.g., display a success message)
      })
      .catch(error => {
        alert('Registration error: ' + error);
        // Handle errors (e.g., display an error message)
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-4 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#00011a'}}>
        <div className="featured-image mb-3">
            <img src="/logo.png" className="img-fluid" alt="logo" style={{ width: '250px' }} />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>Welcome to CinemaWorld!</p>
          <p className="text-white text-wrap text-center" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>Create an account to see what awaits!</p>
        </div>
        <div className="col-md-6 right-box">
          <form onSubmit={handleRegister}>
          
            <div className="header-text mb-4">
              <h2>CinemaWorld</h2>
            </div>
            <div className="input-group mb-3" style={{ marginLeft: '15px' }}>
                <input 
                  name="username" 
                  type="text" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Username" 
                  required 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                />
              </div>
            <div className="input-group mb-3" style={{ marginLeft: '15px' }}>
                <input 
                  name="email" 
                  type="email" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Email address" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="input-group mb-3" style={{ marginLeft: '15px' }}>
                <input 
                  name="password" 
                  type="password" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
            <div className="input-group mb-3" style={{ marginLeft: '15px' }}>
              <input 
                name="confirmPassword" 
                type="password" 
                className="form-control form-control-lg bg-light fs-6" 
                placeholder="Confirm Password" 
                required 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
              />
            </div>
            {/* Rest of your form content */}
            <div className="input-group mb-3" style={{ marginLeft: '15px' }}>
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}