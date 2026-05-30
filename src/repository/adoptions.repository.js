const adoptionsDAO = require('../dao/mongo/adoptions.dao');

class AdoptionRepository {
  async getAll() {
    return await adoptionsDAO.getAll();
  }

  async getById(id) {
    return await adoptionsDAO.getById(id);
  }

  async create(adoptionData) {
    return await adoptionsDAO.create(adoptionData);
  }

  async delete(id) {
    return await adoptionsDAO.delete(id);
  }
}

module.exports = new AdoptionRepository();
