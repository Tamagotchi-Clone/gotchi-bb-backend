const { Router } = require('express');
const UserPet = require('../models/UserPet');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pet = await UserPet.insert(req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const pets = await UserPet.getAllUserPets();
      res.send(pets);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pet = await UserPet.getUserPetById(req.params.id);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const pet = await UserPet.updateUserPetById(req.params.id, req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  });
