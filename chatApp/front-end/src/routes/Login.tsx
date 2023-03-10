import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import LoginButton from './components/LoginButton';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../login/firebase';
import { useAuth } from '../login/useAuth';

interface loginButtonObject {
  id: React.Key;
  label: string;
  provider: any;
  loginFunction: Function;
}

function Login() {
  const navigate = useNavigate();
  const authHook = useAuth();

  const handleLogin = async (prov: any) => {
    await signInWithPopup(auth, prov);
    navigate('/');
  };

  const provider: GoogleAuthProvider = new GoogleAuthProvider();

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const loginButtons: Array<loginButtonObject> = [
    {
      id: 1,
      label: 'Login in with Google',
      provider: GoogleProvider,
      loginFunction: handleLogin,
    },
    {
      id: 2,
      label: 'Login in with Github',
      provider: GithubProvider,
      loginFunction: handleLogin,
    },
  ];

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <span className={styles.loginText}>
          Have a <span className={styles.loginHlText}>Safe Chat</span>
        </span>
        {loginButtons.map((loginButton: loginButtonObject) => {
          return (
            <LoginButton
              key={loginButton.id}
              buttonLabel={loginButton.label}
              loginProvider={loginButton.provider}
              loginEvent={(prov: any) =>
                loginButton.loginFunction(prov)
              }></LoginButton>
          );
        })}
        <span className={styles.moreText}>Working on more options...</span>
        <span>End to end encryption</span>
      </div>
    </div>
  );
}

export default Login;
