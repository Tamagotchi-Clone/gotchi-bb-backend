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
  });
