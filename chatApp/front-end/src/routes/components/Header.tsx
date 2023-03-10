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
      <ModalDialog
        show={showUserInfo}
        onHide={event => {
          handleModalDialogHide(event);
        }}>
        <div className={styles.userInfoWrapper}>
          <span className={styles.userInfoHead}>User info</span>
        </div>
      </ModalDialog>
    </div>
  );
}

export default Header;
