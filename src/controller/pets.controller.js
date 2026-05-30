const petService = require('../service/pets.service');

class PetController {
  async getAllPets(req, res) {
    try {
      const pets = await petService.getAllPets();
      return res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getPetById(req, res) {
    try {
      const { pid } = req.params;
      const pet = await petService.getPetById(pid);
      if (!pet) {
        return res.status(404).json({ status: 'error', error: 'Pet not found' });
      }
      return res.status(200).json({ status: 'success', payload: pet });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async createPet(req, res) {
    try {
      const { name, specie, birthDate } = req.body;
      if (!name || !specie) {
        return res.status(400).json({ status: 'error', error: 'name and specie are required' });
      }
      const pet = await petService.createPet({ name, specie, birthDate });
      return res.status(201).json({ status: 'success', payload: pet });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async updatePet(req, res) {
    try {
      const { pid } = req.params;
      const updated = await petService.updatePet(pid, req.body);
      if (!updated) {
        return res.status(404).json({ status: 'error', error: 'Pet not found' });
      }
      return res.status(200).json({ status: 'success', payload: updated });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async deletePet(req, res) {
    try {
      const { pid } = req.params;
      const deleted = await petService.deletePet(pid);
      if (!deleted) {
        return res.status(404).json({ status: 'error', error: 'Pet not found' });
      }
      return res.status(200).json({ status: 'success', payload: deleted });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
}

module.exports = new PetController();
