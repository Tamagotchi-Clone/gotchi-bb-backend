const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pet = await Pet.insert(req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
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
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.updatePetById(req.params.id, req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.deletePetById(req.params.id);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  });
