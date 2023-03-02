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

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      auth = await getAuth();
      await setUser(auth.currentUser);
      if (!user) {
        navigate('/login');
      }
    };
  }, []);

  return (
    <div className='App'>
      <Chat></Chat>
      <Header></Header>
      <UserList></UserList>
      <span>{user}</span>
    </div>
  );
};

export default App;
