import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  card_progress: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
