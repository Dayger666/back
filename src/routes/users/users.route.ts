import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';

import { getDBInstance } from 'src/dbClient';
import UsersService from 'src/services/users/users.service';
import { zodValidate } from '@common/middlewares/zod-validate.middleware';
import { UserSchema } from '@common/validation-schemas/user-validation-schema';
import { checkIfAuthenticated } from '@common/middlewares/auth.middleware';

const router = Router();

router.post('', zodValidate(UserSchema), async (req: Request, res: Response, next: NextFunction) => {
  const db = await getDBInstance();
  const userService = new UsersService();
  const transaction = await db.sequelize.transaction();
  try {
    const createUser = await userService.create(req.body, transaction);
    await transaction.commit();

    return res.status(201).send(createUser);
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
});

router.get('/:id', checkIfAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const { params: { id } } = req;
  const db = await getDBInstance();
  const userService = new UsersService();
  const transaction = await db.sequelize.transaction();

  try {
    const user = await userService.findOne({ id }, transaction);
    await transaction.commit();

    return res.status(200).send(user);
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
});

export default router;
