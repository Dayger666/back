import {
  Application,
  Request,
  Response,
} from 'express';

import userRoute from './users/users.route';

export class Routes {
  public routes(app: Application): void {
    app.use('/api/v1/users', userRoute);
    app.use('*', (_req: Request, res: Response) => res.render('404'));
  }
}
