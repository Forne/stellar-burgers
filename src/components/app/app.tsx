import '../../index.css';
import styles from './app.module.css';

import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIngredients } from '@slices';
import { useDispatch } from '../../services/store';
import { router } from '../../router/router';
import { getUser } from '@slices';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
