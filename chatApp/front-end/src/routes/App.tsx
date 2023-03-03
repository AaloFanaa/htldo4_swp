import styles from '../styles/App.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { Auth, getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../login/useAuth';
import { auth } from '../login/firebase';

const App = (props: any) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  let userAuth: Auth | null = auth;

  useEffect(() => {
    console.log(userAuth);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.App}>
          <Header></Header>
          <UserList></UserList>
          <Chat></Chat>
          <button
            onClick={() => {
              userAuth?.signOut();
              console.log(auth);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
};

export default App;
