import { ModelStatic, Transaction } from 'sequelize';

import { IUser, ICreateUser } from '@interfaces';
import User from '@models/user';
import { errorMessages } from '@utils/constants';
import { HttpAlreadyExistsError, InternalServerError } from '@common/httpRequestHandlers/http.error';
import FirebaseService from 'src/services/firebase/firebase-service';

class UsersService {
  model: ModelStatic<User>;

  firebaseService: FirebaseService;

  constructor() {
    this.model = User;
    this.firebaseService = new FirebaseService();

    return this;
  }

  async create(data: ICreateUser, transaction?: Transaction): Promise<IUser> {
    const {
      email,
      password,
      ...info
    } = data;
    const foundUser = await this.findOne({ email }, transaction);

    if (!foundUser) {
      const user = await this.model.create({ ...info,
        email }, { transaction });
      await this.firebaseService.createUser({ email,
        password });

      if (!user) {
        throw new InternalServerError(errorMessages.USER_NOT_CREATED);
      }

      return user;
    } else {
      throw new HttpAlreadyExistsError(errorMessages.EMAIL_ALREADY_EXIST);
    }
  }

  async findOne(data: Partial<IUser>, transaction?: Transaction): Promise<IUser> {
    return await this.model.findOne({
      where: data,
      transaction,
    });
  }
}

export default UsersService;
