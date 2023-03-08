import ReactDOM from 'react-dom/client';
import App from './routes/App';
import Login from './routes/Login';
import './styles/index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { auth } from './login/firebase';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => {
      console.log(auth);

      if (auth === null) {
        return redirect('/login');
      }
      return null;
    },
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => {
      auth.signOut();
      console.log(auth);
      return null;
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
