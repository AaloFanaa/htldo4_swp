import styles from '../styles/App.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { Auth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../login/useAuth';
import { auth } from '../login/firebase';

const App = (props: any) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  let userAuth: Auth | null = auth;

  useEffect(() => {
    const fetchUser = async () => {
      await console.log(user);
    };
  }, []);

  return (
    <>
      <div className={styles.App}>
        <Header></Header>
        <UserList></UserList>
        <Chat></Chat>
        <button
          onClick={() => {
            auth.signOut();
            navigate('/login');
          }}>
          Logout
        </button>
      </div>
    </>
  );
};

export default App;
