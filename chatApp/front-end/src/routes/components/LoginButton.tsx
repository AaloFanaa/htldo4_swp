import { useEffect } from 'react';
import styles from '../../styles/LoginButton.module.css';

interface props {
  buttonLabel: string;
  loginProvider: any;
  loginEvent: Function;
}

function LoginButton(props: props) {
  return (
    <>
      <button
        className={styles.loginButton}
        onClick={() => props.loginEvent(props.loginProvider)}
      >
        {props.buttonLabel}
      </button>
    </>
  );
}

export default LoginButton;
