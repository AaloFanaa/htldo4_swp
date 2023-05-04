import { useState } from 'react';
import styles from '../styles/UserList.module.css';
import moreSvg from '../assets/more.svg';
import addChatSvg from '../assets/addChat.svg';

//Interface declarations
interface propsInterface {
  // onConnect: () => void;
  userName: string;
  userList: Array<userEntry>;
}

interface userEntry {
  id: string;
  userName: string;
}

function UserList(props: propsInterface) {
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
        <div className={styles.listHeadText}>Online Users</div>
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
      <div className={styles.list}>
        {props.userList.map((user) => {
          return (
            <>
              <span className={styles.listUser}>
                <span className={styles.listUserName}>{user.userName}</span>
                <span className={styles.listUserConnect}>Connect!</span>
              </span>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
