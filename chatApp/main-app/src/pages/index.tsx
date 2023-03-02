import { Inter } from '@next/font/google';
import styles from '@/styles/Chat.module.css';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  User,
  UserCredential,
  Auth,
} from 'firebase/auth';

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
const auth: Auth = getAuth();
let user: User;

export default function Home() {
  const router = useRouter();
  const user: any = true;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);
  return (
    <>
      <span
        onClick={() => {
          router.push('/login');
        }}>
        Change Page
      </span>
    </>
  );
}
