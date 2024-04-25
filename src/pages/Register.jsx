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

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords don't match.");
      return;
    }

    const registerData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
        credentials: 'include', // Needed for cookies
      });

      if (response.ok) {
        console.log("Registration successful");
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-4 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#00011a'}}>
        <div className="featured-image mb-3">
            <img src="/logo.png" className="img-fluid" alt="logo" style={{ width: '250px' }} />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>Welcome Back!</p>
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

export default Register;
