import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Chat.module.css';
import lockSvg from '../assets/lockIcon.svg';

interface propsInterface {
  localUser: string;
  connectedUser: string;
  currentMessage: string;
  setCurrentMessage: (messageValue: string) => void;
  messages: any;
  sendMessage: () => void;
}

function Chat(props: propsInterface) {
  useEffect(() => {
    console.log(props);
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
              {props.messages &&
              props.messages.hasOwnProperty(props.connectedUser) ? (
                props.messages[props.connectedUser].map(
                  (message: any, index: number) => {
                    return (
                      <div
                        key={message.name + index}
                        className={styles.messageWrapper}
                      >
                        {message.message}
                      </div>
                    );
                  }
                )
              ) : (
                <div className={styles.chatNoMessage}>
                  <span> Start the conversation by writing something...</span>
                </div>
              )}
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
