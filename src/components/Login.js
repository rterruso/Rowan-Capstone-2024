import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle your login logic here
    console.log(email, password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#00011a' }}>
          <div className="featured-image mb-3">
            <img src="../images/logo.png" className="img-fluid" alt="logo" style={{ width: '250px' }} />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>Welcome Back!</p>
          <p className="text-white text-wrap text-center" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>What movie awaits you?</p>
        </div>
        
        <div className="col-md-6 right-box">
          <form onSubmit={handleLogin}> 
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>CinemaWorld</h2>
                <p>A place that offers comprehensive movie information, including detailed databases of movies, actors, and film industry professionals.</p>
              </div>
              <div className="input-group mb-3">
                <input 
                  name="email" 
                  type="text" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Email address" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="input-group mb-1">
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
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="formCheck" />
                  <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                </div>
                <div className="forgot">
                  <small><a href="#">Forgot Password?</a></small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Login</button>
              </div>
              <div className="row">
                {/* <small>Don't have an account? <a href="/register.html">Sign Up</a></small> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;