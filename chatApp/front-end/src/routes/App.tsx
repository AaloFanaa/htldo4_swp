import styles from '../styles/App.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { Auth, getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = (props: any) => {
  const navigate = useNavigate();

  let auth: Auth | null = null;

  // const [auth, setAuth] = useState<Auth | null>();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    auth = props.getAuth;
    console.log(auth);
  }, []);

  return (
    <div className='App'>
      <Chat></Chat>
      <Header></Header>
      <UserList></UserList>
      <button onClick={auth?.signOut()}>Log out</button>
    </div>
  );
};

export default App;
