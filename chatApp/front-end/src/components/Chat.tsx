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
  useEffect(() => {
    console.log('Prop messages:', props.messages);
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
              {/* {props.messages?.map((message: any) => {
                if (message.name === props.connectedUser) {
                  return (
                    <div
                      className={styles.messageWrapper}
                      key={message.name + message.time + message.message}
                    >
                      <span className={styles.messageText}>
                        {message.message}
                      </span>
                    </div>
                  );
                }
                if (message.name === props.localUser) {
                  return (
                    <div
                      className={styles.messageWrapper}
                      key={message.name + message.time + message.message}
                    >
                      {' '}
                      <div className={styles.ownMessage}>
                        <span className={styles.messageText}>
                          {message.message}
                        </span>
                      </div>
                    </div>
                  );
                }
              })} */}
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
