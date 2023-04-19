import styles from '../styles/Login.module.css';

function Login() {
  const login = () => {
    console.log('Login');
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <span className={styles.loginText}>
          - <span className={styles.loginHlText}>Safe Chat</span> -
        </span>
        <input
          className={styles.loginInputName}
          type='text'
          placeholder='Enter a name...'
        />
        <button className={styles.loginButton} onClick={() => login()}>
          Start chatting!
        </button>
      </div>
    </div>
  );
}

export default Login;
