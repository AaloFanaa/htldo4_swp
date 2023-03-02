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
        onClick={() => props.loginEvent(props.loginProvider)}>
        <span className={styles.loginText}>{props.buttonLabel}</span>
      </button>
    </>
  );
}

export default LoginButton;
