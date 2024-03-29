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
          console.log('User tried to login with name: ', name);
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
          console.log('User successfully logged in as: ', name);
          broadcast(users, 'updateUsers', ws);
          console.log('Updated user list!');
        }
        break;
      case 'offer':
        const offerRecipient = users[name];
        if (!!offerRecipient) {
          console.log('Offer:' + ws.name + '\n', offer);
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
        console.log('Answer: ' + ws.name + '\n', answer);
        const answerRecipient = users[name];
        if (!!answerRecipient) {
          console.log(`Sending answer to ${name}!`);
          unicast(answerRecipient, {
            type: 'answer',
            answer,
          });
        } else {
          console.log(`Failed to answer ${name}!`);
          unicast(ws, {
            type: 'error',
            message: `User ${name} does not exist!`,
          });
        }
        break;
      case 'candidate':
        const candidateRecipient = users[name];
        if (!!candidateRecipient) {
          console.log('Candidate: ' + name + '\n', candidate);
          console.log('CandidateRecipient: ' + candidateRecipient.name);
          unicast(candidateRecipient, {
            type: 'candidate',
            candidate,
          });
        }
        break;
      case 'leave':
        delete users[ws.name];
        broadcast(users, 'updateUsers', ws);
        console.log('User left: ', ws.name);
        break;
      default:
        unicast(ws, {
          type: 'error',
          message: 'Type not found: ' + type,
        });
        break;
    }
  });
  ws.on('close', () => {
    console.log(ws.name, ' disconnected');
    if (ws.name) {
      delete users[ws.name];
      if (ws.otherName) {
        const recipient = users[ws.otherName];
        if (!!recipient) {
          recipient.otherName = null;
        }
      }
    }
    broadcast(users, 'removeUser', ws);
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
