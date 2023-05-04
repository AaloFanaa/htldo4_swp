const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { uuid } = require('uuidv4');
const app = express();
const port = 9000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {};

const unicast = (connection, message) => {
  connection.send(JSON.stringify(message));
};

const broadcast = (clients, type, { id, name: userName }) => {
  Object.values(clients).forEach((client) => {
    if (client.name !== userName) {
      client.send(
        JSON.stringify({
          type,
          user: { id, userName },
        })
      );
    }
  });
};

wss.on('connection', (ws) => {
  // console.log(ws);
  ws.on('message', (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch (e) {
      console.log('Invalid JSON');
      data = {};
    }
    const { type, name, offer, answer, candidate } = data;
    switch (type) {
      case 'login':
        if (users[name]) {
          unicast(ws, {
            type: 'login',
            success: false,
            message: 'Username is not available',
          });
          console.log('User tried to login with name: ');
        } else {
          const id = uuid();
          const loggedIn = Object.values(users).map(
            ({ id, name: userName }) => ({ id, userName })
          );
          users[name] = ws;
          ws.name = name;
          ws.id = id;
          unicast(ws, {
            type: 'login',
            success: true,
            users: loggedIn,
          });
          console.log('User successfully logged in as: ');
          broadcast(users, 'updateUsers', ws);
          console.log('Updated user list: ');
        }
        break;
      case 'offer':
        const offerRecipient = users[name];
        if (!!offerRecipient) {
          unicast(offerRecipient, {
            type: 'offer',
            offer,
            name: ws.name,
          });
        } else {
          unicast(ws, {
            type: 'error',
            message: `User ${name} does not exist!`,
          });
        }
        break;
      case 'answer':
        const answerRecipient = users[name];
        if (!!answerRecipient) {
          unicast(answerRecipient, {
            type: 'answer',
            answer,
          });
        } else {
          unicast(ws, {
            type: 'error',
            message: `User ${name} does not exist!`,
          });
        }
        break;
      case 'candidate':
        const candidateRecipient = users[name];
        if (!!candidateRecipient) {
          unicast(candidateRecipient, {
            type: 'candidate',
            candidate,
          });
        }
        break;
      case 'leave':
        broadcast(users, 'leave', ws);
        console.log('User leaved: ');
        break;
      default:
        unicast(ws, {
          type: 'error',
          message: 'Type not found: ' + type,
        });
        break;
    }
  });
  ws.on('close', function () {
    delete users[ws.name];
    broadcast(users, 'leave', ws);
  });
  ws.send(
    JSON.stringify({
      type: 'connect',
      message: 'Connected to server',
    })
  );
});
server.listen(port, () => {
  console.log(`Server running! Port: ${port}`);
});
