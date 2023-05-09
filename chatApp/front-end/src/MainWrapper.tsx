import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/MainWrapper.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import Login from './components/Login';

//Interface declaration
interface props {
  readonly currentConnection: any;
  readonly currentChannel: any;
  updateCurrentConnection: any;
  updateCurrentChannel: any;
}

interface userEntry {
  id: string;
  userName: string;
}

//remote config (prod)
// const configuration = {
//   iceServers: [{ url: "stun:stun.1.google.com:19302" }]
// };

//test config (local)
const configuration: RTCConfiguration | undefined = undefined;

const testUser: Array<userEntry> = [{ id: '12345', userName: 'Test-User' }];

const MainWrapper = (props: props) => {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [socketMessages, setSocketMessages] = useState<Array<any>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<userEntry>>(testUser);
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
          console.log('Connected to signaling server!');
          break;
        case 'login':
          onLogin(data);
          break;
        case 'updateUsers':
          updateUsersList(data);
          break;
        case 'removeUser':
          removeUser(data);
          break;
        // case 'offer':
        //   onOffer(data);
        //   break;
        case 'answer':
          onAnswer(data);
          break;
        case 'candidate':
          onCandidate(data);
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const updateUsersList: (data: any) => void = (data: any) => {
    setUsers(
      (prev: Array<userEntry>) => [...prev, data.user] as Array<userEntry>
    );
    console.log(users);
  };

  const removeUser: (data: any) => void = (data: any) => {
    setUsers((prev: Array<userEntry>) =>
      prev.filter((user) => {
        user !== data.user;
      })
    );
    console.log(users);
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
      setIsLoggedIn(true);
      setUsers(data.users);
      let localConnection = new RTCPeerConnection(configuration);
      localConnection.onicecandidate = ({ candidate }) => {
        let connectedTo = connectedRef.current;

        if (candidate && !!connectedTo) {
          sendSocketMessage({
            name: connectedTo,
            type: 'candidate',
            candidate,
          });
        }
      };
      localConnection.ondatachannel = (event: RTCDataChannelEvent) => {
        console.log('Data channel created');
        let localDataChannel = event.channel;
        localDataChannel.onopen = () => {
          console.log('data channel opened');
        };
        localDataChannel.onmessage = onDataChannelMessage;
        props.updateCurrentChannel(localDataChannel);
      };
      props.updateCurrentConnection(localConnection);
    } else {
      alert('An error occurred while trying to connect!');
    }
  };

  const handleLogout: () => void = () => {
    //TODO: Handle logging out
  };

  //Handeling of datachannel messages
  const onDataChannelMessage: (event: MessageEvent<any>) => any = (
    event: MessageEvent
  ) => {
    console.log(event.target);
    //TODO: handle data messages
  };

  const onAnswer: (data: any) => void = (data: any) => {
    props.currentConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  };

  const onCandidate: (data: any) => void = (data: any) => {
    props.currentConnection.addIceCandidate(
      new RTCIceCandidate(data.candidate)
    );
  };

  const sendSocketMessage = (message: Object) => {
    webSocket.current?.send(JSON.stringify(message));
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.App}>
          <Header
            userName={name}
            logoutSubmit={() => {
              handleLogout();
            }}></Header>
          <UserList userList={users} userName={name}></UserList>
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

export default MainWrapper;
