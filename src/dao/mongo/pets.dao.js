const Pet = require('../../models/Pet');

class PetDAO {
  async getAll() {
    return await Pet.find();
  }

  async getById(id) {
    return await Pet.findById(id);
  }

  async create(petData) {
    return await Pet.create(petData);
  }

  async update(id, data) {
    return await Pet.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Pet.findByIdAndDelete(id);
  }
}

module.exports = new PetDAO();
