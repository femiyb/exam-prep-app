import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const isAuthenticated = localStorage.getItem('userToken');

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="hero-section">
          <h1>{getWelcomeMessage()}, Welcome to the Exam Practice App!</h1>
          <p>Your peer-created platform for mastering the BSc IT Honours curriculum through engaging quizzes.</p>
          {isAuthenticated ? (
            <Link to="/courses" className="button primary-button">Start Learning</Link>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="button primary-button">Login</Link>
              <Link to="/register" className="button secondary-button">Register</Link>
            </div>
          )}
        </header>
        <section className="features-section">
          <h2>Why Use This App?</h2>
          <div className="features">
            <div className="feature">
              <h3>Interactive Quizzes</h3>
              <p>Test your knowledge with quizzes designed by fellow students to help you learn more effectively.</p>
            </div>
            <div className="feature">
              <h3>Progress Tracking</h3>
              <p>Monitor your progress and see how much you've improved. Identify your strengths and areas for improvement.</p>
            </div>
            <div className="feature">
              <h3>Comprehensive Coverage</h3>
              <p>Quizzes cover key topics in the BSc IT Honours curriculum, ensuring you are well-prepared for exams.</p>
            </div>
          </div>
        </section>
        <section className="quote-section">
          <p className="motivational-quote">
            "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family." – Kofi Annan
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
