const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.insert(req.body);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.getAll();
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const profile = await Profile.getProfileById(req.params.id);
      res.send(profile);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.updateProfileById(req.params.id, req.body);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.deleteProfileByid(req.params.id);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  });
