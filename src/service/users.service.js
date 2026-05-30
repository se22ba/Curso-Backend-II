const usersRepository = require('../repository/users.repository');
const bcrypt = require('bcrypt');

class UserService {
  async getAllUsers() {
    return await usersRepository.getAll();
  }

  async getUserById(id) {
    return await usersRepository.getById(id);
  }

  async createUser(userData) {
    const { first_name, last_name, email, password, role } = userData;
    const hashed = await bcrypt.hash(password, 10);
    return await usersRepository.create({ first_name, last_name, email, password: hashed, role });
  }

  async updateUser(id, data) {
    return await usersRepository.update(id, data);
  }

  async deleteUser(id) {
    return await usersRepository.delete(id);
  }
}

module.exports = new UserService();
