import styles from '../styles/Header.module.css';
import logoutSvg from '../assets/logout.svg';
import { useEffect, useState } from 'react';

function Header() {
  let [userName, setUserName] = useState<string>('');
  let [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  const handleModalDialogHide = (e: Event) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setShowUserInfo(false);
    }
  };

  const logout = () => {
    console.log('logout');
  };

  return (
    <div className={styles.Header}>
      <div
        className={styles.userDisplay}
        onClick={() => {
          setShowUserInfo(true);
        }}
      >
        <span className={styles.userName}>
          {userName !== '' ? userName : 'Loading...'}
        </span>
      </div>
      <div
        className={styles.logoutButton}
        onClick={() => {
          logout();
        }}
      >
        <img src={logoutSvg}></img>
      </div>
    </div>
  );
}

export default Header;
