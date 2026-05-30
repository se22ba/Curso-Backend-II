const petsDAO = require('../dao/mongo/pets.dao');

class PetRepository {
  async getAll() {
    return await petsDAO.getAll();
  }

  async getById(id) {
    return await petsDAO.getById(id);
  }

  async create(petData) {
    return await petsDAO.create(petData);
  }

  async update(id, data) {
    return await petsDAO.update(id, data);
  }

  async delete(id) {
    return await petsDAO.delete(id);
  }
}

module.exports = new PetRepository();
