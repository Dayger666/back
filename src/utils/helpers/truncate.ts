import models from '@models/index';

export const truncate = async () => await Promise.all(
  Object.keys(models).map(key => {
    if (['sequelize', 'Sequelize'].includes(key)) {
      return null;
    }

    return models[key].destroy({ where: {},
      force: true });
  }),
);
