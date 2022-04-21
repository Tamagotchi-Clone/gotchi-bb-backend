const { Router } = require('express');

const PetScore = require('../models/PetScore');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const score = await PetScore.insert(req.body);
      res.send(score);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const score = await PetScore.getAllScores();
      res.send(score);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const score = await PetScore.getScoreByUserId(req.params.id);
      res.send(score);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const score = await PetScore.updateByScoreId(req.params.id, req.body);
      res.send(score);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const score = await PetScore.deleteScoresById(req.params.id);
      res.send(score);
    } catch (error) {
      next(error);
    }
  });
