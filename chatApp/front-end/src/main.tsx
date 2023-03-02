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
import store from './userStore';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      const user: any = await getUser();
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

function getUser() {}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
