import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FaLock, FaUser } from 'react-icons/fa';
import "./Login.css";

const Login = () => {
  return (
      <div className="login-wrapper">
        <h2 className="login-header">Login</h2>

        <button className="button-connect">
        <FontAwesomeIcon icon={faGoogle} className="icon" />
          Connect with Google
        </button>
        <button className="button-connect">
        <FontAwesomeIcon icon={faFacebook} className="icon" />
          Connect with Facebook
        </button>

        <hr/>

        <div className="form">
          <input type="text" placeholder="Email" required/>
          <FaUser className="icon" />
        </div>

        <div className="form">
          <input type="password" placeholder="Password" required/>
          <FaLock className="icon" />
        </div>

        <div className="remember-forget">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="login-button">Login</button>
        
        <div className="create-account">
          <p>Don't have an account? <a className="create">Create Account</a></p>
        </div>
      </div>
  )
}

export default Login
