import * as yup from 'yup';

export const prizeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  stickers_required: yup.number().integer().required(),
  retailer_id: yup.string().nullable().required(),
});
