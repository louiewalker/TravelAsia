import React from 'react';

import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className="login-signup-container">
      <div className="login-singup-form-container">
       
        <button
          className="login-signup-signupBtn"
          onClick={() => navigate('/signup')}
        >
          Sign up
        </button>
        <button
          className="login-signup-loginBtn"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
        <div className="login-signup-v2-disclaimer">
          <span>
            By signing up you agree to our <Link to="/terms">Terms</Link> of Use
            and <Link to={'/privacy'}> Privacy Policy</Link>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
