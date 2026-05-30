const Adoption = require('../../models/Adoption');

class AdoptionDAO {
  async getAll() {
    return await Adoption.find().populate('owner').populate('pet');
  }

  async getById(id) {
    return await Adoption.findById(id).populate('owner').populate('pet');
  }

  async create(adoptionData) {
    return await Adoption.create(adoptionData);
  }

  async delete(id) {
    return await Adoption.findByIdAndDelete(id);
  }
}

module.exports = new AdoptionDAO();
