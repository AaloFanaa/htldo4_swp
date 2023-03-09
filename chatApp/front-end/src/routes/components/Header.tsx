import styles from '../../styles/Header.module.css';
import { useAuth } from '../../login/useAuth';
import logoutSvg from '../../assets/logout.svg';
import placeholderImage from '../../assets/placeholder_image.jpg';

function Header() {
  const { user } = useAuth();

  return (
    <div className={styles.Header}>
      <div className={styles.userDisplay}>
        <img
          className={styles.userImg}
          src={user ? user?.photoURL : placeholderImage}></img>
        <span className={styles.userName}>
          {user ? user.displayName : 'Loading...'}
        </span>
      </div>
      <img src={logoutSvg}></img>
    </div>
  );
}

export default Header;
