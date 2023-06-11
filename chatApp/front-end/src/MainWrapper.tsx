import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/MainWrapper.module.css';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import Login from './components/Login';

//Interface declaration
interface props {
  currentConnection: RTCPeerConnection | null;
  currentChannel: RTCDataChannel | null;
  updateCurrentConnection: any;
  updateCurrentChannel: any;
}

interface userEntry {
  id: string;
  userName: string;
}

// remote config
// const configuration: RTCConfiguration | undefined = {
//   iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
// };

//test config (local)
const configuration: RTCConfiguration | undefined = undefined;

const MainWrapper = (props: props) => {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [socketMessages, setSocketMessages] = useState<Array<any>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<userEntry>>([]);
  const [connectedTo, setConnectedTo] = useState('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const connectedRef = useRef<any>();
  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const messagesRef = useRef<any>([]);
  const [messages, setMessages] = useState<Object>();

  //setup and handle socket
  useEffect(() => {
    // setMessages([]);
    webSocket.current = new WebSocket('ws://localhost:9000');
    webSocket.current.onmessage = (message) => {
      const data: any = JSON.parse(message.data);
      setSocketMessages([...socketMessages, data]);
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
        case 'offer':
          onOffer(data);
          break;
        case 'answer':
          onAnswer(data);
          break;
        case 'candidate':
          onCandidate(data);
          break;
        default:
          console.log('Unknown message type!');
          console.log(data);
          break;
      }
    }
  }, [socketMessages]);

  const updateUsersList: (data: any) => void = (data: any) => {
    setUsers(
      (prev: Array<userEntry>) => [...prev, data.user] as Array<userEntry>
    );
  };

  const removeUser: (data: any) => void = (data: any) => {
    setUsers((prev: Array<userEntry>) =>
      prev.filter((user) => {
        user !== data.user;
      })
    );
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
      setIsLoggedIn(true);
      setUsers(data.users);
      let localConnection = new RTCPeerConnection(configuration);
      localConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        let connectedTo = connectedRef.current;

        if (event.candidate && !!connectedTo) {
          console.log('Discovered candidate: ', event.candidate);
          sendSocketMessage({
            name: connectedTo,
            type: 'candidate',
            candidate: event.candidate,
          });
        }
      };
      localConnection.ondatachannel = (event: RTCDataChannelEvent) => {
        console.log('Created data channel...');
        let localDataChannel = event.channel;
        localDataChannel.onopen = () => {
          console.log('Data channel open...');
        };
        localDataChannel.onmessage = onChatMessage;
        props.updateCurrentChannel(localDataChannel);
      };
      props.updateCurrentConnection(localConnection);
      alert(`Login was successfull!\nLogged in as: ${name}`);
    } else {
      alert('An error occurred while trying to connect!');
    }
  };

  const handleLogout: () => void = () => {
    location.reload();
  };

  //Handeling sent chat messages
  const sendChatMessage = () => {
    const messageTime = new Date().toISOString;
    let messageText = message;
    setMessage('');
    let newMessage = { name: name, message: messageText, time: messageTime };

    addNewMessage(newMessage);

    props.currentChannel!.send(JSON.stringify(newMessage));

    // let newMessages: Array<Object> = new Array();
    // newMessages.push(...messages!);
    // newMessages.push(newMessage);
    // setMessages(newMessages);
  };

  //Handeling recived data channel messages
  const onChatMessage: (data: any) => void = (data: any) => {
    const newMessage = JSON.parse(data.data);

    // console.log('New Message: ', newMessage);
    addNewMessage(newMessage);
    // console.log('Messages after: ', messages);

    // console.log('New Messages before: ', newMessages);
    // newMessages.push(...messages!);
    // newMessages.push(newMessage);
    // console.log('New Mesages after: ', newMessages);
    // console.log('Messages before: ', messages);
    // setMessages(newMessages);
    // console.log('Messages after: ', messages);
  };

  const addNewMessage: (message: any) => void = (message: any) => {
    let messageOwner = connectedTo;
    let updatedMessages: any = new Object();
    if (messages !== undefined) {
      updatedMessages = messages;
      if (updatedMessages[messageOwner] !== undefined) {
        updatedMessages[messageOwner].push(message);
        setMessages(updatedMessages);
        return;
      }
      updatedMessages[messageOwner] = [message];
      setMessages(updatedMessages);
      return;
    }
    // Object.defineProperty(updatedMessages, messageOwner, [message]);
    updatedMessages[messageOwner] = [message];
    setMessages(updatedMessages);
    return;

    // Message object structure
    // messages: {
    //    name1: [{message1},{message2}]
    //    name2: [{message1},{message2}]
    // }

    // const initalArray: Array<Object> = [];
    // let updatedMessages: Array<Object>;
    // console.log('Messages in func: ', messages);
    // if (messages !== undefined) {
    //   updatedMessages = [...messages!, message];
    //   setMessages(updatedMessages);
    //   return;
    // }
    // updatedMessages = [...initalArray, message];
    // setMessages(updatedMessages);
  };

  const onAnswer: (data: any) => void = (data: any) => {
    console.log('Answering \n', data);
    props.currentConnection!.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  };

  const onCandidate: (data: any) => void = (data: any) => {
    console.log('New candidate\n', data.candidate);
    props.currentConnection!.addIceCandidate(
      new RTCIceCandidate(data.candidate)
    );
  };

  const onOffer: (data: any) => void = (data: any) => {
    console.log('Recived offer\n', data);
    setConnectedTo(data.name);
    connectedRef.current = data.name;
    props
      .currentConnection!.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      )
      .then(() => props.currentConnection!.createAnswer())
      .then((answer: any) =>
        props.currentConnection!.setLocalDescription(answer)
      )
      .then(() => {
        sendSocketMessage({
          type: 'answer',
          answer: props.currentConnection!.localDescription,
          name: data.name,
        });
      })
      .catch((e: any) => {
        console.log({ e });
        alert('Something went wrong while trying to connect!');
      });
  };

  const onConnect: (userName: string) => void = (userName: string) => {
    console.log('Trying to connect to ', userName);
    if (connectedRef.current === userName) {
      setConnecting(true);
      setConnectedTo('');
      connectedRef.current = '';
      setConnecting(false);
    } else {
      setConnecting(true);
      setConnectedTo(userName);
      connectedRef.current = userName;
      initializeConnection(userName);
      setConnecting(false);
    }
  };

  const initializeConnection: (user: string) => void = async (user: string) => {
    let dataChannel: RTCDataChannel =
      props.currentConnection!.createDataChannel('messenger');

    dataChannel.onerror = (error: Event) => {
      console.log(error);
      alert('An error occured with the data channel!');
    };

    dataChannel.onmessage = onChatMessage;
    props.updateCurrentChannel(dataChannel);
    let offer = await props.currentConnection!.createOffer();
    await props.currentConnection!.setLocalDescription(offer);
    let description = props.currentConnection!.localDescription;
    sendSocketMessage({
      type: 'offer',
      offer: description,
      name: user,
    });
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
            }}
          ></Header>
          <UserList
            userList={users}
            userName={name}
            connectedTo={connectedTo}
            onConnect={onConnect}
          ></UserList>
          <Chat
            localUser={name}
            connectedUser={connectedTo}
            currentMessage={message}
            setCurrentMessage={setMessage}
            messages={messages}
            sendMessage={sendChatMessage}
          ></Chat>
        </div>
      ) : (
        <Login
          onNameChange={(username: string) => {
            setName(username);
          }}
          onNameSubmit={() => {
            handleLogin();
          }}
        ></Login>
      )}
    </>
  );
};

export default MainWrapper;
