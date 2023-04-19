import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Chat.module.css';
import lockSvg from '../../assets/lockIcon.svg';
import { useAuth } from '../../login/useAuth';

function Chat() {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  let [userName, setUserName] = useState<string>('');
  const [socketMessages, setSocketMessages] = useState<any>([]);
  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const messagesRef = useRef({});
  const [messages, setMessages] = useState({});

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    setUserName(user?.displayName!);
    webSocket.current = new WebSocket('ws://localhost:9000');
    webSocket.current.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      console.log(data);
      setSocketMessages((prev: any) => [...prev, data]);
      console.log(socketMessages);
    };
    webSocket.current.onclose = () => {
      webSocket.current!.close();
    };
    return () => webSocket.current!.close();
  }, []);

  useEffect(() => {
    let data: any = socketMessages.pop();
    if (data) {
      switch (data.type) {
        case 'connect':
          setSocketOpen(true);
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const send = (data: any) => {
    webSocket.current!.send(JSON.stringify(data));
  };

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
