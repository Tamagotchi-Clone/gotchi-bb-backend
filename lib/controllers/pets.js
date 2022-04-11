const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pet = await Pet.getAllPets();
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pets = await Pet.getPetsById(req.params.id);
      res.send(pets);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
