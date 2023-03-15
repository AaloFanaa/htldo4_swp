import styles from '../../styles/Header.module.css';
import { useAuth } from '../../login/useAuth';
import { auth } from '../../login/firebase';
import logoutSvg from '../../assets/logout.svg';
import placeholderImage from '../../assets/placeholder_image.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalDialog from './ModalDialog';

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userPic: any = user?.photoURL as any; //Typescript does not like me :(
  const maxNameLength: number = 14;
  let [userName, setUserName] = useState<string>('');
  let [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  useEffect(() => {
    let length: number = user?.displayName!.length!;
    if (length! < maxNameLength) {
      setUserName(user?.displayName!);
      return;
    }
    setUserName(user?.displayName?.slice(0, maxNameLength - 3) + '...');
  });

  const handleModalDialogHide = (e: Event) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setShowUserInfo(false);
    }
  };

  const convertUnixtimestampToDate: (timestamp: string | null) => string = (
    timestamp: string | null
  ) => {
    if (!timestamp) {
      return 'Error while converting';
    }
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let seconds = '0' + date.getSeconds();
    let formattedTime =
      ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  };

  return (
    <div className={styles.Header}>
      <div
        className={styles.userDisplay}
        onClick={() => {
          setShowUserInfo(true);
        }}>
        <img
          className={styles.userImg}
          alt='User picture'
          src={user ? userPic : placeholderImage}></img>
        <span className={styles.userName}>
          {userName !== '' ? userName : 'Loading...'}
        </span>
      </div>
      <div
        className={styles.logoutButton}
        onClick={() => {
          auth.signOut();
          navigate('/login');
        }}>
        <img src={logoutSvg}></img>
      </div>
      {/* User info modal */}
      <ModalDialog
        show={showUserInfo}
        onHide={event => {
          handleModalDialogHide(event);
        }}>
        <div className={styles.userInfoWrapper}>
          <div className={styles.userInfoText}>Name: {userName}</div>
          <div className={styles.userInfoText}>Email: {user?.email}</div>
          <div className={styles.userInfoText}>
            Last login:
            {convertUnixtimestampToDate(user?.metadata.lastSignInTime)}
          </div>
          <img
            className={styles.userInfoImg}
            src={userPic}
            alt='User picture'
          />
        </div>
      </ModalDialog>
    </div>
  );
}

export default Header;
