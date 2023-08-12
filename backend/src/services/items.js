const db = require('../db/models');
const ItemsDBApi = require('../db/api/items');

module.exports = class ItemsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ItemsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let items = await ItemsDBApi.findBy({ id }, { transaction });

      if (!items) {
        throw new ValidationError('itemsNotFound');
      }

      await ItemsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return items;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await ItemsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
