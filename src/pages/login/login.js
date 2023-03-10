//import ui from '../../firebase/config';

import styles from './login-module.css';
import { useState } from 'react';

const Login = () => { 
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)

}

  return (
    <div className="login__form">
      <div className="container">
        <h1>Entrar</h1>
        <p>Hello!</p>
        <form onSubmit ={handleSubmit}>
          <label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={values.email}
              onChange = {(e) => setValues({...values, email: e.target.value})}
           
            />
          </label>
          {'\n'}
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              value={values.password}
              onChange = {(e) => setValues({...values, password: e.target.value})}          
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
