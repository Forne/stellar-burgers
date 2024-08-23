import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectOrderBun, selectOrderIngredients } from '@slices';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const orderBun = useSelector(selectOrderBun);
  const orderIngredients = useSelector(selectOrderIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    orderIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (orderBun) counters[orderBun._id] = 2;
    return counters;
  }, [orderBun, orderIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
