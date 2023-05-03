import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/MainWrapper.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import Login from './components/Login';

//remote config
// const configuration = {
//   iceServers: [{ url: "stun:stun.1.google.com:19302" }]
// };

//local config
const configuration: RTCConfiguration | undefined = undefined;

const MainWrapper = (props: props) => {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [socketMessages, setSocketMessages] = useState<Array<any>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const [connectedTo, setConnectedTo] = useState('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const connectedRef = useRef();
  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const messagesRef = useRef({});
  const [messages, setMessages] = useState({});

  //setup and handle socket
  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:9000');
    webSocket.current.onmessage = (message) => {
      const data: any = JSON.parse(message.data);
      setSocketMessages([...socketMessages, data]);
      //   console.log(socketMessages);
    };
    webSocket.current.onclose = () => {
      webSocket.current!.close();
    };
    return () => webSocket.current!.close();
  }, []);

  //Handle socket messages
  useEffect(() => {
    let data: any = socketMessages.pop();
    if (data) {
      switch (data.type) {
        case 'connect':
          setSocketOpen(true);
          console.log('Connected!');
          break;
        case 'login':
          onLogin(data);
          break;
        // case 'updateUsers':
        //   updateUsersList(data);
        //   break;
        // case 'removeUser':
        //   removeUser(data);
        //   break;
        // case 'offer':
        //   onOffer(data);
        //   break;
        // case 'answer':
        //   onAnswer(data);
        //   break;
        // case 'candidate':
        //   onCandidate(data);
        //   break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  //function for sending messages
  const sendSocketMessage = (message: Object) => {
    webSocket.current?.send(JSON.stringify(message));
  };

  const handleLogin: () => void = () => {
    setLoggingIn(true);
    sendSocketMessage({
      type: 'login',
      name,
    });
  };

  const onLogin: (data: any) => void = (data: any) => {
    setLoggingIn(false);
    if (data.success) {
      alert(`Login was successfull!\nLogged in as: ${name}`);
    }
    setIsLoggedIn(true);
    setUsers(data.users);
    let localConnection = new RTCPeerConnection(configuration);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.App}>
          <Header
            logoutSubmit={() => {
              handleLogout();
            }}></Header>
          <UserList></UserList>
          <Chat></Chat>
        </div>
      ) : (
        <Login
          onNameChange={(username: string) => {
            setName(username);
          }}
          onNameSubmit={() => {
            handleLogin();
          }}></Login>
      )}
    </>
  );
};

//Interface declaration
interface props {
  readonly currentConnection: any;
  readonly currentChannel: any;
  updateCurrentConnection: any;
  updateCurrentChannel: any;
}

export default MainWrapper;
