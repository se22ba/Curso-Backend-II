const { expect } = require('chai');
const sinon = require('sinon');

const adoptionService = require('../src/service/adoption.service');
const adoptionController = require('../src/controller/adoption.controller');

const mockRes = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('Adoption Router - Functional Tests', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/adoptions - getAllAdoptions', () => {
    it('debería retornar 200 con lista de adopciones', async () => {
      const fakeAdoptions = [
        { _id: 'a1', owner: { _id: 'u1', first_name: 'Juan' }, pet: { _id: 'p1', name: 'Rex' } },
        { _id: 'a2', owner: { _id: 'u2', first_name: 'Ana' }, pet: { _id: 'p2', name: 'Luna' } }
      ];
      sinon.stub(adoptionService, 'getAllAdoptions').resolves(fakeAdoptions);

      const req = {};
      const res = mockRes();

      await adoptionController.getAllAdoptions(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('success');
      expect(response.payload).to.deep.equal(fakeAdoptions);
    });

    it('debería retornar lista vacía si no hay adopciones', async () => {
      sinon.stub(adoptionService, 'getAllAdoptions').resolves([]);

      const req = {};
      const res = mockRes();

      await adoptionController.getAllAdoptions(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.payload).to.be.an('array').that.is.empty;
    });

    it('debería retornar 500 si el servicio lanza un error', async () => {
      sinon.stub(adoptionService, 'getAllAdoptions').rejects(new Error('Database error'));

      const req = {};
      const res = mockRes();

      await adoptionController.getAllAdoptions(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
      expect(response.error).to.equal('Database error');
    });
  });

  describe('GET /api/adoptions/:aid - getAdoptionById', () => {
    it('debería retornar 200 con la adopción encontrada', async () => {
      const fakeAdoption = {
        _id: 'a1',
        owner: { _id: 'u1', first_name: 'Juan' },
        pet: { _id: 'p1', name: 'Rex' }
      };
      sinon.stub(adoptionService, 'getAdoptionById').resolves(fakeAdoption);

      const req = { params: { aid: 'a1' } };
      const res = mockRes();

      await adoptionController.getAdoptionById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('success');
      expect(response.payload).to.deep.equal(fakeAdoption);
    });

    it('debería retornar 404 si la adopción no existe', async () => {
      sinon.stub(adoptionService, 'getAdoptionById').resolves(null);

      const req = { params: { aid: 'id-inexistente' } };
      const res = mockRes();

      await adoptionController.getAdoptionById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
      expect(response.error).to.equal('Adoption not found');
    });

    it('debería retornar 500 si el servicio lanza un error inesperado', async () => {
      sinon.stub(adoptionService, 'getAdoptionById').rejects(new Error('Unexpected error'));

      const req = { params: { aid: 'a1' } };
      const res = mockRes();

      await adoptionController.getAdoptionById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
    });
  });

  describe('POST /api/adoptions/:uid/:pid - createAdoption', () => {
    it('debería retornar 201 al crear una adopción exitosamente', async () => {
      const fakeAdoption = {
        _id: 'a1',
        owner: 'u1',
        pet: 'p1'
      };
      sinon.stub(adoptionService, 'createAdoption').resolves(fakeAdoption);

      const req = { params: { uid: 'u1', pid: 'p1' } };
      const res = mockRes();

      await adoptionController.createAdoption(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('success');
      expect(response.payload).to.deep.equal(fakeAdoption);
    });

    it('debería retornar 404 si el usuario no existe', async () => {
      const error = new Error('User not found');
      error.status = 404;
      sinon.stub(adoptionService, 'createAdoption').rejects(error);

      const req = { params: { uid: 'uid-invalido', pid: 'p1' } };
      const res = mockRes();

      await adoptionController.createAdoption(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
      expect(response.error).to.equal('User not found');
    });

    it('debería retornar 404 si la mascota no existe', async () => {
      const error = new Error('Pet not found');
      error.status = 404;
      sinon.stub(adoptionService, 'createAdoption').rejects(error);

      const req = { params: { uid: 'u1', pid: 'pid-invalido' } };
      const res = mockRes();

      await adoptionController.createAdoption(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
      expect(response.error).to.equal('Pet not found');
    });

    it('debería retornar 400 si la mascota ya fue adoptada', async () => {
      const error = new Error('Pet is already adopted');
      error.status = 400;
      sinon.stub(adoptionService, 'createAdoption').rejects(error);

      const req = { params: { uid: 'u1', pid: 'p1' } };
      const res = mockRes();

      await adoptionController.createAdoption(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
      expect(response.error).to.equal('Pet is already adopted');
    });

    it('debería retornar 500 ante un error interno no manejado', async () => {
      sinon.stub(adoptionService, 'createAdoption').rejects(new Error('Internal server error'));

      const req = { params: { uid: 'u1', pid: 'p1' } };
      const res = mockRes();

      await adoptionController.createAdoption(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      const response = res.json.firstCall.args[0];
      expect(response.status).to.equal('error');
    });
  });

  describe('Adoption Service - Unit Tests', () => {
    let adoptionsRepository;
    let usersRepository;
    let petsRepository;

    beforeEach(() => {
      adoptionsRepository = require('../src/repository/adoptions.repository');
      usersRepository = require('../src/repository/users.repository');
      petsRepository = require('../src/repository/pets.repository');
    });

    it('getAllAdoptions debería retornar todas las adopciones del repositorio', async () => {
      const fakeData = [{ _id: 'a1' }];
      sinon.stub(adoptionsRepository, 'getAll').resolves(fakeData);

      const result = await adoptionService.getAllAdoptions();
      expect(result).to.deep.equal(fakeData);
    });

    it('getAdoptionById debería retornar la adopción con el id dado', async () => {
      const fakeAdoption = { _id: 'a1', owner: 'u1', pet: 'p1' };
      sinon.stub(adoptionsRepository, 'getById').resolves(fakeAdoption);

      const result = await adoptionService.getAdoptionById('a1');
      expect(result).to.deep.equal(fakeAdoption);
    });

    it('createAdoption debería lanzar error si el usuario no existe', async () => {
      sinon.stub(usersRepository, 'getById').resolves(null);

      try {
        await adoptionService.createAdoption('uid-invalido', 'p1');
        expect.fail('Debería haber lanzado un error');
      } catch (err) {
        expect(err.message).to.equal('User not found');
        expect(err.status).to.equal(404);
      }
    });

    it('createAdoption debería lanzar error si la mascota no existe', async () => {
      sinon.stub(usersRepository, 'getById').resolves({ _id: 'u1' });
      sinon.stub(petsRepository, 'getById').resolves(null);

      try {
        await adoptionService.createAdoption('u1', 'pid-invalido');
        expect.fail('Debería haber lanzado un error');
      } catch (err) {
        expect(err.message).to.equal('Pet not found');
        expect(err.status).to.equal(404);
      }
    });

    it('createAdoption debería lanzar error si la mascota ya fue adoptada', async () => {
      sinon.stub(usersRepository, 'getById').resolves({ _id: 'u1' });
      sinon.stub(petsRepository, 'getById').resolves({ _id: 'p1', adopted: true });

      try {
        await adoptionService.createAdoption('u1', 'p1');
        expect.fail('Debería haber lanzado un error');
      } catch (err) {
        expect(err.message).to.equal('Pet is already adopted');
        expect(err.status).to.equal(400);
      }
    });

    it('createAdoption debería crear la adopción correctamente', async () => {
      const fakeUser = { _id: 'u1', pets: [] };
      const fakePet = { _id: 'p1', adopted: false };
      const fakeAdoption = { _id: 'a1', owner: 'u1', pet: 'p1' };

      sinon.stub(usersRepository, 'getById').resolves(fakeUser);
      sinon.stub(petsRepository, 'getById').resolves(fakePet);
      sinon.stub(petsRepository, 'update').resolves({ ...fakePet, adopted: true, owner: 'u1' });
      sinon.stub(usersRepository, 'update').resolves({ ...fakeUser, pets: ['p1'] });
      sinon.stub(adoptionsRepository, 'create').resolves(fakeAdoption);

      const result = await adoptionService.createAdoption('u1', 'p1');
      expect(result).to.deep.equal(fakeAdoption);
    });
  });
});
