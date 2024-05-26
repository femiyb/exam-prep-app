import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('https://exam-prep-py-9550849aa8ea.herokuapp.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data); // Set user details as currentUser
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem('userToken', token);
    fetchUserDetails(token);
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
