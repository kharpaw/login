import React, { useState } from 'react';
import './login.css';

import user_icon from '../../Asset/person.png';
import email_icon from '../../Asset/email.png';
import password_icon from '../../Asset/password.png';

export const Login = () => {
  const [action, setAction] = useState('Sign Up');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const endpoint =
        action === 'Login'
          ? 'http://localhost:3000/api/v1/login'
          : 'http://localhost:3000/api/v1/signup';

      const payload =
        action === 'Login'
          ? { email, password }
          : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action !== 'Login' && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === 'Login' && (
        <div className="forget-password">
          Forgot Password? <span>Click here!</span>
        </div>
      )}

      <div className="submit_container">
        <div
          className={action === 'Login' ? 'submit grey' : 'submit'}
          onClick={() => setAction('Sign Up')}
        >
          Sign Up
        </div>

        <div
          className={action === 'Sign Up' ? 'submit grey' : 'submit'}
          onClick={() => setAction('Login')}
        >
          Login
        </div>
      </div>

      <div className="submit_container">
        <button className="submit" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </div>
  );
};

export default Login;