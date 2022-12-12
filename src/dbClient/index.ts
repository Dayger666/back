import * as pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

import { InternalServerError } from '@common/httpRequestHandlers/http.error';
import models from '@models/index';
import {
  LOCAL_DATABASE,
  LOCAL_DATABASE_HOST,
  LOCAL_DATABASE_PASSWORD,
  LOCAL_DATABASE_USER,
} from 'src/config';

let db = null as DBInterface;

export interface DBInterface {
  sequelize: Sequelize,
  authenticate: () => void
}

export class DB implements DBInterface {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres' as Dialect,
      host: LOCAL_DATABASE_HOST,
      username: LOCAL_DATABASE_USER,
      password: LOCAL_DATABASE_PASSWORD,
      database: LOCAL_DATABASE,
      dialectModule: pg,
      models,
    });
  }

  async authenticate() {
    try {
      await this.sequelize.sync({ force: false })
        .then(() => console.info('DB Connection established successfully.'))
        .catch(err => console.error(`DB Sequelize Connection Failed: ${err}`));
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export const getDBInstance = async () => {
  try {
    if (!db) {
      db = new DB();
    }

    await db.authenticate();

    return db;
  } catch (e) {
    throw new InternalServerError(e);
  }
};
