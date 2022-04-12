const { Router } = require('express');
const UserPet = require('../models/UserPet');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const pet = await UserPet.insert(req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const pets = await UserPet.getAllUserPets();
      res.send(pets);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const pet = await UserPet.getUserPetById(req.params.id);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const pet = await UserPet.updateUserPetById(req.params.id, req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const pet = await UserPet.deleteUserPetById(req.params.id);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  });
