import { useState, useEffect } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';

import './App.css';
import SiteHeader from './components/SiteHeader';
import DisplayUsers from './components/DisplayUsers';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

//Firebase config for authentification
const firebaseConfig = {
  apiKey: 'AIzaSyA26AsQ9Kf5KMfhqweAh5Egj-RzUvqhYak',
  authDomain: 'webrtc-chat-app-76567.firebaseapp.com',
  projectId: 'webrtc-chat-app-76567',
  storageBucket: 'webrtc-chat-app-76567.appspot.com',
  messagingSenderId: '1090800716251',
  appId: '1:1090800716251:web:4323f0fe383b62b5943ffe',
};

//Firebase authentification
const firebase: FirebaseApp = initializeApp(firebaseConfig);
const provider: GoogleAuthProvider = new GoogleAuthProvider();
const auth: any = getAuth();
let user: User | null = null;

function App() {
  //User login state handeling
  useEffect(
    onAuthStateChanged(auth, (currUser: any) => {
      if (currUser) {
        console.log(currUser.displayName);
        user = currUser;
      } else {
        console.log('No user signed in');
      }
    })
  );

  return (
    <>
      {user != null ? (
        <div className='app'>
          <SiteHeader></SiteHeader>
          <DisplayUsers></DisplayUsers>
          <ChatRoom></ChatRoom>
        </div>
      ) : (
        <Login tryLogin={hanldeLogin}></Login>
      )}
    </>
  );
}

//Login handeling
const hanldeLogin: Function = () => {
  signInWithPopup(auth, provider)
    .then((res: UserCredential) => {
      console.log(res);
      console.log('Auth: ' + auth);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const handleLogout: Function = () => {
  auth.signOut;
};

export default App;
