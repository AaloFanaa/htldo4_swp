import { useState } from 'react';
import styles from '../../styles/UserList.module.css';
import moreSvg from '../../assets/more.svg';

function UserList() {
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
    </div>
  );
}

export default UserList;
