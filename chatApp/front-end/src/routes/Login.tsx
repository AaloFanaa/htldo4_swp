import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  UserCredential,
  Auth,
} from 'firebase/auth';
import LoginButton from './components/LoginButton';

interface loginButtonObject {
  label: string;
  provider: any;
  loginFunction: Function;
}

function Login() {
  const handleLogin = (prov: any) => {
    // signInWithPopup(prov);
  };

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  useEffect(() => {}, []);

  const loginButtons: Array<loginButtonObject> = [
    {
      label: 'Login in with Google!',
      provider: GoogleProvider,
      loginFunction: handleLogin,
    },
    {
      label: 'Login in with Github!',
      provider: GithubProvider,
      loginFunction: handleLogin,
    },
  ];

  return (
    <div className={styles.Login}>
      {loginButtons.map((loginButton: loginButtonObject) => {
        return (
          <LoginButton
            buttonLabel={loginButton.label}
            loginProvider={loginButton.provider}
            loginEvent={(prov: any) =>
              loginButton.loginFunction(prov)
            }></LoginButton>
        );
      })}
    </div>
  );
}

export default Login;
