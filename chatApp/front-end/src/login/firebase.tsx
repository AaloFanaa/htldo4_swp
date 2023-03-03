import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA26AsQ9Kf5KMfhqweAh5Egj-RzUvqhYak',
  authDomain: 'webrtc-chat-app-76567.firebaseapp.com',
  projectId: 'webrtc-chat-app-76567',
  storageBucket: 'webrtc-chat-app-76567.appspot.com',
  messagingSenderId: '1090800716251',
  appId: '1:1090800716251:web:4323f0fe383b62b5943ffe',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
