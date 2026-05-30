const userService = require('../service/users.service');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { uid } = req.params;
      const user = await userService.getUserById(uid);
      if (!user) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
      return res.status(200).json({ status: 'success', payload: user });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({ status: 'success', payload: user });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { uid } = req.params;
      const updated = await userService.updateUser(uid, req.body);
      if (!updated) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
      return res.status(200).json({ status: 'success', payload: updated });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await userService.deleteUser(uid);
      if (!deleted) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
      return res.status(200).json({ status: 'success', payload: deleted });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
}

module.exports = new UserController();
