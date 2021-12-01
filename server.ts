import dotenv from 'dotenv';
dotenv.config();

import './core/db';

import express from 'express';
import bodyParser from 'body-parser';

import { registerValidations } from './validations/register';
import { passport } from './core/passport';

import { UserCtrl } from './controllers/UserController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);

app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING!');
});
