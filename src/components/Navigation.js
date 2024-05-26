import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import LogoutButton from './LogoutButton'; // Adjust the path based on your file structure
import { useAuth } from '../AuthContext'; // Adjusted import path

function Navigation() {
  const { currentUser } = useAuth(); // Get the current user from the context
  const isAuthenticated = !!currentUser;

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link"></Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="nav-item">
              <span className="nav-link">Welcome, {currentUser.email}</span> {/* Display user's email */}
            </li>
            <li className="nav-item log-out">
              <LogoutButton /> {/* Logout button added here */}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
