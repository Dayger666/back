import {
  NextFunction,
  Request,
  Response,
} from 'express';

import FirebaseService from 'src/services/firebase/firebase-service';
import { UnauthorizedError } from '@common/httpRequestHandlers/http.error';

interface IAuthRequest extends Request {
  authToken: string | null,
  authId: string,
}

const getAuthToken = (
  req: IAuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }

  next();
};

export const checkIfAuthenticated = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const firebaseService = new FirebaseService();
      const userInfo = await firebaseService.client
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;

      return next();
    } catch (e) {
      next(new UnauthorizedError());
    }
  });
};
