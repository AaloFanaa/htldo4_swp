import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Chat.module.css';
import lockSvg from '../../assets/lockIcon.svg';
import { useAuth } from '../../login/useAuth';

function Chat() {
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [socketMessages, setSocketMessages] = useState<any>([]);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<string>>([]);
  const [connectedTo, setConnectedTo] = useState<string | null>('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [alert, setAlert] = useState(null);
  const connectedRef = useRef();
  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const messagesRef = useRef({});
  const [messages, setMessages] = useState({});
  const { isLoggedIn, user } = useAuth();
  let [userName, setUserName] = useState<string>('');


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
          break;
      }
    }
  }, [socketMessages]);

  const send = (data: any) => {
    webSocket.current!.send(JSON.stringify(data));
  };

  const updateUsersList = (data: any) => {
    setUsers((prev: Array<string>) => [...prev, data.user]);
  };

  const removeUser = (data: any) => {
    setUsers(prev => prev.filter((u: any) => u.userName !== userName));
  }

  const handleDataChannelMessageReceived = (data: string) => {
    const message: unknown = JSON.parse(data);
    const { name: user }: any = message;
    let messages = messagesRef.current;
    // @ts-expect-error
    let userMessages = messages[user];
    if (userMessages) {
      userMessages = [...userMessages, message];
      let newMessages = Object.assign({}, messages, { [user]: userMessages });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    } else {
      let newMessages = Object.assign({}, messages, { [user]: [message] });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    }
  };

  const onLogin = ({ success, message, users: loggedIn ) => {
    setLoggingIn(false);
    if (success) {
      alert("Success!");
      setIsLoggedIn(true);
      setUsers(loggedIn);
      let localConnection = new RTCPeerConnection(configuration);
      //when the browser finds an ice candidate we send it to another peer
      localConnection.onicecandidate = ({ candidate }) => {
        let connectedTo = connectedRef.current;

        if (candidate && !!connectedTo) {
          send({
            name: connectedTo,
            type: "candidate",
            candidate
          });
        }
      };
      localConnection.ondatachannel = event => {
        console.log("Data channel is created!");
        let receiveChannel = event.channel;
        receiveChannel.onopen = () => {
          console.log("Data channel is open and ready to be used.");
        };
        receiveChannel.onmessage = handleDataChannelMessageReceived;
        updateChannel(receiveChannel);
      };
      updateConnection(localConnection);
    } else {
      console.log("Channel open");
    }
  };

  //when somebody wants to message us
  const onOffer = ({ offer, name }) => {
    setConnectedTo(name);
    connectedRef.current = name;

    connection
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => connection.createAnswer())
      .then(answer => connection.setLocalDescription(answer))
      .then(() =>
        send({ type: "answer", answer: connection.localDescription, name })
      )
      .catch(e => {
        console.log({ e });
      });
  };

  //when another user answers to our offer
  const onAnswer = ({ answer }) => {
    connection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  //when we got ice candidate from another user
  const onCandidate = ({ candidate }) => {
    connection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  //when a user clicks the send message button
  const sendMsg = () => {
    const time = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    let text = { time, message, name };
    let messages = messagesRef.current;
    let connectedTo = connectedRef.current;
    let userMessages = messages[connectedTo];
    if (messages[connectedTo]) {
      userMessages = [...userMessages, text];
      let newMessages = Object.assign({}, messages, {
        [connectedTo]: userMessages
      });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    } else {
      userMessages = Object.assign({}, messages, { [connectedTo]: [text] });
      messagesRef.current = userMessages;
      setMessages(userMessages);
    }
    channel.send(JSON.stringify(text));
    setMessage("");
  };

  const handleConnection = name => {
    var dataChannelOptions = {
      reliable: true
    };

    let dataChannel = connection.createDataChannel("messenger");

    dataChannel.onerror = error => {
      console.log(error);
      alert(error);
    };

    dataChannel.onmessage = handleDataChannelMessageReceived;
    updateChannel(dataChannel);

    connection
      .createOffer()
      .then(offer => connection.setLocalDescription(offer))
      .then(() =>
        send({ type: "offer", offer: connection.localDescription, name })
      )
      .catch(e =>
console.log("Failed!", e);
alert("Failed!");
      );
  };

  const toggleConnection = userName => {
    if (connectedRef.current === userName) {
      setConnecting(true);
      setConnectedTo("");
      connectedRef.current = "";
      setConnecting(false);
    } else {
      setConnecting(true);
      setConnectedTo(userName);
      connectedRef.current = userName;
      handleConnection(userName);
      setConnecting(false);
    }
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
