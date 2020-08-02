import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name.'),
  drinkName: Yup.string().required('Please enter your drink.'),
  price: Yup.number().required('Please enter the price.')
});
