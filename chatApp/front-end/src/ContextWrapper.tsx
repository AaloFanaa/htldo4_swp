import React, { useState } from 'react';
import styles from './styles/ContextWrapper.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { ConnectionConsumer, ChannelConsumer } from './App';
import Login from './components/Login';

const ContextWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <ConnectionConsumer>
      {({ connection, updateConnection }) => (
        <ChannelConsumer>
          {({ channel, updateChannel }) => (
            <div className={styles.wrapper}>
              {!isLoggedIn === true ? (
                <div className={styles.App}>
                  <Header></Header>
                  <UserList></UserList>
                  <Chat></Chat>
                </div>
              ) : (
                <div className={styles.Login}>
                  <Login></Login>
                </div>
              )}
            </div>
          )}
        </ChannelConsumer>
      )}
    </ConnectionConsumer>
  );
};

export default ContextWrapper;
