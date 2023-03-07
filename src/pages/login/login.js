//import ui from '../../firebase/config';

import styles from './login-module.css';

const Login = () => {
  return (
    <div className="login__form">
      <div className="container">
        <h1>Entrar</h1>
        <p>Hello!</p>
        <form onSubmit="">
          <label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              onChange=""
              value=""
            />
          </label>
          {'\n'}
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              onChange=""
              value=""
            />
          </label>
          {'\n'}

          <button className="btn">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
