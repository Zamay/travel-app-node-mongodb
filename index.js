import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import { loginValidation, registerValidation, bookingCreateValidation } from './validations.js';
import { UserController, TripController, BookingController } from './controllers/index.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

mongoose
  .connect('mongodb+srv://root:root@cluster0.lb5t2d5.mongodb.net/travel?retryWrites=true&w=majority')
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/sign-in', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/sign-up', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/authenticated-user', checkAuth, UserController.getMe);

app.get('/bookings', checkAuth, BookingController.getAll);
app.post('/bookings', checkAuth, BookingController.create);
app.delete('/bookings/:id', checkAuth, BookingController.remove);

app.get('/trips', checkAuth, TripController.getAll);
app.post('/trips', checkAuth, TripController.create);
app.get('/trips/:id', checkAuth, TripController.getOne);

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});
