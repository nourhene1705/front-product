import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
        navigate('/produits');
      } else {
        setErrorMessage('Vérifier votre adresse e-mail ou mot de passe');
      }
    } catch (error) {
      setErrorMessage('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="main-title">Bienvenue</h1>

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="E-mail" 
              required 
            />
          </div>
          <div className="input-group password-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Mot de passe" 
              required 
            />
            <button 
              type="button" 
              className="show-password-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
