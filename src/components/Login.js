import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState(''); // For displaying information messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    try {
      const response = await fetch('https://exam-prep-py-9550849aa8ea.herokuapp.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('userToken', data.access_token);
        navigate('/courses');
      } else {
        console.error('Login failed:', data);
        setError(data.error || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Server error or network issue:', error);
      setError('Server error or network issue');
    }
  };

  const handleResendConfirmation = async () => {
    setError('');
    setInfo('');

    try {
      const response = await fetch('https://exam-prep-py-9550849aa8ea.herokuapp.com/api/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setInfo('Confirmation email resent successfully');
      } else {
        setError(data.error || 'Failed to resend confirmation email');
      }
    } catch (error) {
      console.error('Server error or network issue:', error);
      setError('Server error or network issue');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
        {info && <p className="info">{info}</p>}
      </form>
      {error === 'Email not confirmed. Please confirm your email first.' && (
        <button onClick={handleResendConfirmation}>Resend Confirmation Email</button>
      )}
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
