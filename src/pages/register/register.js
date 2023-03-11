import styles from './register-module.css';
import { useState } from 'react';

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState('');

  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== confirmPassword) {
      setValues({ ...values, error: 'Passwords are not the same!' });
      return;
    }

    console.log(values);
  };

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Enter a username"
            value={values.displayName}
            onChange={(e) =>
              setValues({ ...values, displayName: e.target.value })
            }
          />
        </label>
        {'\n'}
        <label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter an email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </label>
        {'\n'}
        <label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter a password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </label>
        {'\n'}
        <label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {'\n'}
        {values.error && <p className={styles.error}>{values.error}</p>}{' '}
        <button className={styles.btn}>Enter</button>
      </form>
    </div>
  );
};

export default Register;
