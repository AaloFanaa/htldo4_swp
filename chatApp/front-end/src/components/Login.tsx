import { FormEventHandler } from 'react';
import styles from '../styles/Login.module.css';

function Login() {
  const handleSubmit = () => {};

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <span className={styles.loginText}>
          - <span className={styles.loginHlText}>Safe Chat</span> -
        </span>
        <form method='post' onSubmit={handleSubmit}>
          <input
            className={styles.loginInputName}
            type='text'
            placeholder='Enter a name'
          />
          <button className={styles.loginButton} type='submit'>
            Start chatting!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
