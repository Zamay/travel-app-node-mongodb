import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неправильний формат пошти').isEmail(),
  body('password', 'Пароль має бути мінімум 3 символів').isLength({ min: 3 }),
];

export const registerValidation = [
  body('email', 'Неправильний формат пошти').isEmail(),
  body('password', 'Пароль має бути мінімум 3 символів').isLength({ min: 3 }),
  body('fullName', 'Вкажіть ім\'я').isLength({ min: 3 }),
];

export const bookingCreateValidation = [
  body('date', 'Виберіть дату').isString,
  body('totalPrice', 'Некоректна ціна').isNumeric,
  body('guests', 'Некоректна кількість гостей').isNumeric,
];
