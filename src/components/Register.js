import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateEmailDomain = (email) => {
    return email.endsWith('@my.richfield.ac.za');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmailDomain(email)) {
      setError('Only emails ending with @my.richfield.ac.za are allowed.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch('https://exam-prep-py-9550849aa8ea.herokuapp.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setMessage('Registration successful! Please check your email to confirm your address.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed, please try again.');
      }
    } catch (error) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">Register</button>
        <Link to="/login" className="button">Login</Link>
      </form>
    </div>
  );
}

export default Register;
