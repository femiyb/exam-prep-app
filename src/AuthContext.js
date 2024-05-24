import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // You may want to validate the token or fetch user details here
      setCurrentUser(token); // Set user token as currentUser, modify as per your need
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('userToken', token);
    setCurrentUser(token);
    navigate('/courses');
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
