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
import { ProtectedRoute } from '../components/protected-route';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ConstructorPage /> },
      { path: '/feed', element: <Feed /> },
      {
        path: '/login',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        )
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <NotFound404 /> },
      {
        path: '/feed/:number',
        element: (
          <Modal
            title='Заказ'
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
            title='Ингредиент'
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
            title='Заказ'
            onClose={() => {
              history.back();
            }}
          >
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          </Modal>
        )
      }
    ]
  }
]);
