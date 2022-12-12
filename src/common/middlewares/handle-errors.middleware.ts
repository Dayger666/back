import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { HttpError } from '@common/httpRequestHandlers/http.error';

export const handleErrors = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.name,
      message: err.message,
    });
  }

  next(err);
};
