const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const uuidv4 = require('uuid');

const app = express();
const port = 9000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {};

const sendTo = (connection, message) => {
  connection.send(JSON.stringify(message));
};

const sendToAll = (clients, type, { id, name: userName }) => {
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
  console.log(ws);
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
          sendTo(ws, {
            type: 'login',
            success: false,
            message: 'Username is not available',
          });
        } else {
          const id = uuidv4();
          const loggedIn = Object.values(users).map(
            ({ id, name: userName }) => ({ id, userName })
          );
          users[name] = ws;
          ws.name = name;
          ws.id = id;
          sendTo(ws, {
            type: 'login',
            success: true,
            users: loggedIn,
          });
          sendToAll(users, 'updateUsers', ws);
        }
        break;
      case 'offer':
        const offerRecipient = users[name];
        if (!!offerRecipient) {
          sendTo(offerRecipient, {
            type: 'offer',
            offer,
            name: ws.name,
          });
        } else {
          sendTo(ws, {
            type: 'error',
            message: `User ${name} does not exist!`,
          });
        }
        break;
      case 'answer':
        const answerRecipient = users[name];
        if (!!answerRecipient) {
          sendTo(answerRecipient, {
            type: 'answer',
            answer,
          });
        } else {
          sendTo(ws, {
            type: 'error',
            message: `User ${name} does not exist!`,
          });
        }
        break;
      case 'candidate':
        const candidateRecipient = users[name];
        if (!!candidateRecipient) {
          sendTo(candidateRecipient, {
            type: 'candidate',
            candidate,
          });
        }
        break;
      case 'leave':
        sendToAll(users, 'leave', ws);
        break;
      default:
        sendTo(ws, {
          type: 'error',
          message: 'Command not found: ' + type,
        });
        break;
    }
  });
  ws.on('close', function () {
    delete users[ws.name];
    sendToAll(users, 'leave', ws);
  });
  ws.send(
    JSON.stringify({
      type: 'connect',
      message: 'Connected to signaling server',
    })
  );
});
//start our server
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
