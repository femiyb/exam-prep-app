import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.post(`https://exam-prep-py-9550849aa8ea.herokuapp.com/api/confirm/${token}`, {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');  // Redirect to login after 3 seconds
        }, 3000);
      } catch (error) {
        setMessage(error.response?.data?.error || 'An error occurred');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div className="confirm-email-container">
      <h2>Email Confirmation</h2>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmEmail;
