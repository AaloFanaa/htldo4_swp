import { useEffect } from 'react';
import '../styles/App.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';

function App(props: any) {
  return (
    <div className='App'>
      <Chat></Chat>
      <Header></Header>
      <UserList></UserList>
    </div>
  );
}

export default App;
