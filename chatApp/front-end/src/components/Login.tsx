import { FormEventHandler, useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';

interface propsInterface {
  onNameSubmit: () => void;
  onNameChange: (name: string) => void;
}

function Login(props: propsInterface) {
  const [nameValue, setNameValue] = useState<string>('');

  const handleChange = (event: any) => {
    setNameValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.onNameSubmit();
  };

  useEffect(() => {
    props.onNameChange(nameValue);
  }, [handleSubmit]);

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <span className={styles.loginText}>
          - <span className={styles.loginHlText}>Safe Chat</span> -
        </span>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            id='nameInput'
            placeholder='Name'
            className={styles.loginInputName}
            type='text'
            onChange={handleChange}
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
