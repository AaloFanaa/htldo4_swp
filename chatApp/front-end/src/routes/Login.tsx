import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import LoginButton from './components/LoginButton';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  Auth,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface loginButtonObject {
  id: React.Key;
  label: string;
  provider: any;
  loginFunction: Function;
}

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (prov: any) => {
    await signInWithPopup(auth, prov);
    localStorage.setItem('auth', JSON.stringify(auth));
    navigate('/');
  };

  //Firebase authentification
  const provider: GoogleAuthProvider = new GoogleAuthProvider();
  const auth: Auth = getAuth();

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const loginButtons: Array<loginButtonObject> = [
    {
      id: 1,
      label: 'Login in with Google!',
      provider: GoogleProvider,
      loginFunction: handleLogin,
    },
    {
      id: 2,
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
            key={loginButton.id}
            buttonLabel={loginButton.label}
            loginProvider={loginButton.provider}
            loginEvent={(prov: any) => loginButton.loginFunction(prov)}
          ></LoginButton>
        );
      })}
    </div>
  );
}

export default Login;
