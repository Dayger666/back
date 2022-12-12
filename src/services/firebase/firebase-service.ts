import * as admin from 'firebase-admin';

import { ICreateUser } from '@interfaces';

class FirebaseService {
  client;

  constructor() {
    this.client = admin;

    return this;
  }

  async createUser(data: ICreateUser): Promise<void> {
    await this.client.auth().createUser({ ...data });
  }
}

export default FirebaseService;
