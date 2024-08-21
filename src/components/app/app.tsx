import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <ConstructorPage /> },
  { path: '/feed', element: <Feed /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/profile', element: <Profile /> },
  { path: '/profile/orders', element: <ProfileOrders /> },
  { path: '*', element: <NotFound404 /> },
  {
    path: '/feed/:number',
    element: (
      <Modal title='' onClose={() => {}}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='' onClose={() => {}}>
        <IngredientDetails />
      </Modal>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <Modal title='' onClose={() => {}}>
        <OrderInfo />
      </Modal>
    )
  }
]);

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouterProvider router={router} />
  </div>
);

export default App;
