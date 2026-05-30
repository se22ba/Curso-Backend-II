const adoptionsRepository = require('../repository/adoptions.repository');
const usersRepository = require('../repository/users.repository');
const petsRepository = require('../repository/pets.repository');

class AdoptionService {
  async getAllAdoptions() {
    return await adoptionsRepository.getAll();
  }

  async getAdoptionById(id) {
    return await adoptionsRepository.getById(id);
  }

  async createAdoption(uid, pid) {
    const user = await usersRepository.getById(uid);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const pet = await petsRepository.getById(pid);
    if (!pet) {
      const error = new Error('Pet not found');
      error.status = 404;
      throw error;
    }

    if (pet.adopted) {
      const error = new Error('Pet is already adopted');
      error.status = 400;
      throw error;
    }

    await petsRepository.update(pid, { adopted: true, owner: user._id });
    await usersRepository.update(uid, { $push: { pets: pet._id } });

    const adoption = await adoptionsRepository.create({ owner: user._id, pet: pet._id });
    return adoption;
  }
}

module.exports = new AdoptionService();
