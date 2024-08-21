import '../../index.css';
import styles from './app.module.css';

import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useDispatch } from '../../services/store';
import { router } from '../../router/router';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
