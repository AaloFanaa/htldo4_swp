import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Chat.module.css';
import lockSvg from '../assets/lockIcon.svg';

interface propsInterface {
  localUser: string;
  connectedUser: string;
  currentMessage: string;
  setCurrentMessage: (messageValue: string) => void;
  messages: Object | undefined;
  sendMessage: () => void;
}

function Chat(props: propsInterface) {
  const [localMessages, setLocalMessages] = useState<Array<Object>>();

  useEffect(() => {
    // @ts-expect-error
    setLocalMessages(props.messages[props.connectedUser]);
  }, [props]);

  return (
    <div className={styles.Chat}>
      <div className={styles.chatBackground}>
        {props.connectedUser === '' ? (
          <div className={styles.chatPlaceholder}>
            <img className={styles.placeholderImg} src={lockSvg} alt='Lock' />
            <span className={styles.placeholderText}>
              End to end encryption
            </span>
          </div>
        ) : (
          <div className={styles.chatBox}>
            <div className={styles.chatUserDisplay}>
              <div>
                Chatting with
                <span> {props.connectedUser}</span>
              </div>
            </div>
            <div className={styles.chatMessages}>
              {localMessages?.map((message) => {
                // @ts-expect-error
                return <span>{message.message}</span>;
              })}
            </div>
            <div className={styles.chatControls}>
              <div className={styles.controlsWrapper}>
                <input
                  type='text'
                  placeholder={'Send a message to ' + props.connectedUser}
                  value={props.currentMessage}
                  onChange={(e: any) => {
                    props.setCurrentMessage(e.target.value);
                  }}
                />
                <button
                  onClick={props.sendMessage}
                  disabled={props.currentMessage === ''}
                >
                  Send!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
