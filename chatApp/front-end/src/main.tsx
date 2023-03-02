import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import Login from './routes/Login';
import './styles/index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, User } from 'firebase/auth';
import { get } from 'immer/dist/internal';

const firebaseConfig = {
  apiKey: 'AIzaSyA26AsQ9Kf5KMfhqweAh5Egj-RzUvqhYak',
  authDomain: 'webrtc-chat-app-76567.firebaseapp.com',
  projectId: 'webrtc-chat-app-76567',
  storageBucket: 'webrtc-chat-app-76567.appspot.com',
  messagingSenderId: '1090800716251',
  appId: '1:1090800716251:web:4323f0fe383b62b5943ffe',
};

const firebase: FirebaseApp = initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      const auth: Auth | null = await getAuth();
      const user = await auth.currentUser;
      console.log(user);
      if (!user) {
        return redirect('/login');
      }
      return null;
    },
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
