import styles from '../styles/App.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { Auth } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuth } from '../login/useAuth';
import { auth } from '../login/firebase';
import { Navigate, useNavigate } from 'react-router-dom';

const App = (props: any) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  let userAuth: Auth | null = auth;

  useEffect(() => {
    const fetchUser = async () => {
      await console.log(user);
      if (!isLoggedIn) {
        navigate('./login');
      }
    };
  }, []);

  return (
    <>
      <div className={styles.App}>
        <Header></Header>
        <UserList></UserList>
        <Chat></Chat>
      </div>
    </>
  );
};

export default App;
