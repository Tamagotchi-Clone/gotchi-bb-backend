const { Router } = require('express');

const Pet_score = require('../models/Pet_score');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const pet_score = await Pet_score.insert(req.body);
    res.send(pet_score);
  } catch (error) {
    next(error);
  }
});
