import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Chat.module.css';
import lockSvg from '../../assets/lockIcon.svg';

function Chat() {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [socketMessages, setSocketMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string | null>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const [connectedTo, setConnectedTo] = useState<string | null>('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [alert, setAlert] = useState(null);
  const connectedRef = useRef();
  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const messagesRef = useRef({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:9000');
    webSocket.current.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      console.log(data);
      // setSocketMessages((prev) =>
      //   [...prev, data];
      // );
    };
    webSocket.current.onclose = () => {
      webSocket.current!.close();
    };
    return () => webSocket.current!.close();
  }, []);

  const send = (data: any) => {
    webSocket.current!.send(JSON.stringify(data));
  };

  const handleLogin = () => {
    setLoggingIn(true);
    send({
      type: 'login',
      name,
    });
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.chatBackground}>
        {!connectedTo ? (
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
