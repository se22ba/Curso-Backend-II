const adoptionService = require('../service/adoption.service');

class AdoptionController {
  async getAllAdoptions(req, res) {
    try {
      const adoptions = await adoptionService.getAllAdoptions();
      return res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getAdoptionById(req, res) {
    try {
      const { aid } = req.params;
      const adoption = await adoptionService.getAdoptionById(aid);
      if (!adoption) {
        return res.status(404).json({ status: 'error', error: 'Adoption not found' });
      }
      return res.status(200).json({ status: 'success', payload: adoption });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async createAdoption(req, res) {
    try {
      const { uid, pid } = req.params;
      const adoption = await adoptionService.createAdoption(uid, pid);
      return res.status(201).json({ status: 'success', payload: adoption });
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ status: 'error', error: error.message });
    }
  }
}

module.exports = new AdoptionController();
