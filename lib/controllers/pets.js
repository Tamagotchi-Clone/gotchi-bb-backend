const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const pet = await Pet.getAllPets();
    res.send(pet);
  } catch (error) {
    next(error);
  }
});
