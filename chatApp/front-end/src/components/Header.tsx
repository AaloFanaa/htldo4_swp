import styles from '../styles/Header.module.css';
import logoutSvg from '../assets/logout.svg';
import { useEffect, useState } from 'react';

interface propsInterface {
  logoutSubmit: () => void;
  userName: string;
}

function Header(props: propsInterface) {
  let [userName, setUserName] = useState<string>('');
  let [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  const logout = () => {
    console.log('logout');
    props.logoutSubmit();
  };

  return (
    <div className={styles.Header}>
      <div className={styles.userDisplay}>
        <span className={styles.userName}>
          {props.userName !== '' ? props.userName : 'Loading...'}
        </span>
      </div>
      <div
        className={styles.logoutButton}
        onClick={() => {
          logout();
        }}>
        <img src={logoutSvg}></img>
      </div>
    </div>
  );
}

export default Header;
