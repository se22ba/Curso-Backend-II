const usersDAO = require('../dao/mongo/users.dao');

class UserRepository {
  async getAll() {
    return await usersDAO.getAll();
  }

  async getById(id) {
    return await usersDAO.getById(id);
  }

  async getByEmail(email) {
    return await usersDAO.getByEmail(email);
  }

  async create(userData) {
    return await usersDAO.create(userData);
  }

  async update(id, data) {
    return await usersDAO.update(id, data);
  }

  async delete(id) {
    return await usersDAO.delete(id);
  }
}

module.exports = new UserRepository();
