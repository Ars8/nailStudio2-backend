import dotenv from 'dotenv';
dotenv.config();

import './core/db';

import express from 'express';
import bodyParser from 'body-parser';

import { registerValidations } from './validations/register';
import { passport } from './core/passport';

import { UserCtrl } from './controllers/UserController';
import { MastersCtrl } from './controllers/MastersController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/masters', MastersCtrl.index);
app.get('/masters/:id', MastersCtrl.getMaster);
app.get('/masters/appointment/:id', MastersCtrl.getMasterAppointment);
app.post('/masters', MastersCtrl.create);

app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING!');
  console.log('SERVER RUNNING!');
});
