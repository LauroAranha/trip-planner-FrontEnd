//import ui from '../../firebase/config';

import styles from './register-module.css';

const Register = () => {
  return (
    <div className="">
      <h1>Register</h1>
      <label>
        <form>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Enter a username"
            value=""
            onChange=""
          />
        </form>
      </label>
      <label>
        <form>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter a email"
            onChange=""
            value=""
          />
        </form>
      </label>
      <label>
        <form>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter a password"
            onChange=""
            value=""
          />
        </form>
      </label>
      <label>
        <form>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            onChange=""
            value=""
          />
        </form>
      </label>
      <button className="btn">Enter</button>
    </div>
  );
};

export default Register;
