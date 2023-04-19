import { useState } from 'react';
import styles from '../styles/UserList.module.css';
import moreSvg from '../assets/more.svg';
import addChatSvg from '../assets/addChat.svg';

function UserList() {
  let [showUsersAvailable, setShowUsersAvailable] = useState<boolean>(false);

  const handleModalDialogHide = (e: Event) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setShowUsersAvailable(false);
    }
  };

  return (
    <div className={styles.UserList}>
      <div className={styles.listHead}>
        <div className={styles.listHeadText}>Chats</div>
        <div className={styles.listHeadIcons}>
          <img
            className={styles.icon}
            src={moreSvg}
            alt='Settings'
            onClick={() => {
              alert('This button does nothing!');
            }}
          />
        </div>
      </div>
      <div className={styles.list}></div>
      <img
        className={styles.newChatButton}
        src={addChatSvg}
        alt='Add Chat'
        onClick={() => {
          setShowUsersAvailable(true);
        }}
      />
    </div>
  );
}

export default UserList;
