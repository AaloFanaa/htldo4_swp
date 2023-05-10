import { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';
import moreSvg from '../assets/more.svg';
import addChatSvg from '../assets/addChat.svg';

//Interface declarations
interface propsInterface {
  onConnect: (userName: string) => void;
  userName: string;
  userList: Array<userEntry>;
}

interface userEntry {
  id: string;
  userName: string;
}

function UserList(props: propsInterface) {
  const [users, setUsers] = useState<Array<userEntry>>();

  useEffect(() => {
    setUsers(props.userList);
  }, [props.userList]);

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
        {users?.map((user: userEntry) => {
          return (
            <span
              key={user.id}
              className={styles.listUser}
              onClick={() => {
                props.onConnect(user.userName);
              }}>
              <span className={styles.listUserName}>{user.userName}</span>
              <span className={styles.listUserConnect}>Connected?</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
