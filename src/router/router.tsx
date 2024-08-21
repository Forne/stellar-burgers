import { createBrowserRouter } from 'react-router-dom';
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
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { Layout } from './layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
          <Modal
            title=''
            onClose={() => {
              history.back();
            }}
          >
            <OrderInfo />
          </Modal>
        )
      },
      {
        path: '/ingredients/:id',
        element: (
          <Modal
            title=''
            onClose={() => {
              history.back();
            }}
          >
            <IngredientDetails />
          </Modal>
        )
      },
      {
        path: '/profile/orders/:number',
        element: (
          <Modal
            title=''
            onClose={() => {
              history.back();
            }}
          >
            <OrderInfo />
          </Modal>
        )
      }
    ]
  }
]);
