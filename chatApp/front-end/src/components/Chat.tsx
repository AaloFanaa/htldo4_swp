import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Chat.module.css';
import lockSvg from '../assets/lockIcon.svg';

function Chat() {
  return (
    <div className={styles.Chat}>
      <div className={styles.chatBackground}>
        {true ? (
          <div>
            {' '}
            <img src={lockSvg} alt='Lock' />
            <span>End to end encryption</span>{' '}
          </div>
        ) : (
          <div>
            <span>Display Chat</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
