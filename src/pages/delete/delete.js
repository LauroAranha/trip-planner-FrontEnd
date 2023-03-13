import './delete-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faUser } from '@fortawesome/free-solid-svg-icons';

document.body.style.overflow = 'hidden';

const Delete = () => {
  const [values, setValues] = useState({
    id: '',
    password:'',
  
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post('http://localhost:3000/user/login ', values);
  };

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  const handleToggle = () => {
    // For the main password field
    if (type === 'password') {
      setIcon(faEye);
      setType('text');
    } else {
      setIcon(faEyeSlash);
      setType('password');
    }
  };

  return (
    <div className="page-login">
      <div className="container-login">
        <h1>📍 Trip Planner</h1>
      </div>
      <h1 className="page-title-login">DELETE USER</h1>
      <div className="page-input-login">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="id"
              name="id"
              required
              placeholder="id"
              value={values.id}
              onChange={(e) => setValues({ ...values, id: e.target.value })}
            />
          </label>
          {'\n'}
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </label>
          <label>
     
            <div className="page-link-login">
     
            </div>
          </label>
          {'\n'}
          <button className="login-btn">DELETE</button>
       
        </form>
      </div>
    </div>
  );
};

export default Delete;
