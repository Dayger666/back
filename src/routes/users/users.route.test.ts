import request from 'supertest';

import server from 'src/app';
import { IUser } from '@interfaces';
import { truncate } from '@helpers/truncate';

describe('Users Route', () => {
  describe('/POST users', () => {
    const mockUser = <IUser>{ email: 'test123@gmail.com' };

    it('it should create a new user', async () => {
      const res = await request(server)
        .post('')
        .send(mockUser);
      expect(res.status).toBe(201);
    });
  });
  afterAll(async () => {
    await truncate();
  });
});
