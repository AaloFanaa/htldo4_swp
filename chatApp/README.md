
# SafeChat

This is a Peer2Peer chat app created using

- WebRTC for the Peer2Peer connection
- React in the front end
- Firebase for authentification
- NodeJs as a signaling server




## Authors

- [@AaloFanaa](https://www.github.com/aalofanaa)


## How it works

In order for a peer-to-peer connection to be established, peers first have to tell each other when they want to start or stop the communication. They also have to exchange about the media types they want to share and they have to find each other in the network. This is the signaling process.

The signaling isn’t part of the WebRTC specifications. That means I had to take care of exchanging the messages needed to establish and control the connection. The easiest solution for this was a WebSocket server with NodeJs and Express.

The server itself does not have any information on the data that is beeing exchanged. It's just there to take care of the sessions/connections. It also keeps track of all available peers so other peers can see them. There are a few steps to establish a connection, but once it's done the hard part is over and the only thing remaining to do is the front end which the client can see.