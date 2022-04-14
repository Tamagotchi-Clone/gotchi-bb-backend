const { Router } = require('express');

const PetScore = require('../models/PetScore');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const petScore = await PetScore.insert(req.body);
      res.send(petScore);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const petScore = await PetScore.getAllScores();
      res.send(petScore);
    } catch (error) {
      next(error);
    }
  });
