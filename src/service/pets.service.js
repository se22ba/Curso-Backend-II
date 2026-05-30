const petsRepository = require('../repository/pets.repository');

class PetService {
  async getAllPets() {
    return await petsRepository.getAll();
  }

  async getPetById(id) {
    return await petsRepository.getById(id);
  }

  async createPet(petData) {
    return await petsRepository.create(petData);
  }

  async updatePet(id, data) {
    return await petsRepository.update(id, data);
  }

  async deletePet(id) {
    return await petsRepository.delete(id);
  }
}

module.exports = new PetService();
