import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';

import { handleErrors } from '@common/middlewares/handle-errors.middleware';

import { Routes } from './routes';
import { FIREBASE_DATABASE_URL } from './config';

import 'reflect-metadata';

const serviceAccount = require('serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
});

class App {
  public app: express.Application;

  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.app.use(handleErrors);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.set('view engine', 'ejs');
  }
}

export default new App().app;
