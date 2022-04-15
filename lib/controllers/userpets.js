const { Router } = require('express');
const UserPet = require('../models/UserPet');
const time = require('../services/time');
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
  .post('/difference', async (req, res, next) => {
    try {
      const difference = time(req.body.date);
      res.json({ difference });
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id/hunger', async (req, res, next) => {
    const today = new Date();
    try {
      const update = await UserPet.updateUserPetById(req.params.id, {
        hunger: today,
      });
      res.send(update);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id/play', authenticate, async (req, res, next) => {
    const today = new Date();
    const pet = UserPet.getUserPetById(req.params.id);
    const user = req.user.id;
    try {
      if (user.petId === pet.userId) {
        const update = await UserPet.updateUserPetById(req.params.id, {
          play: today,
        });
        res.send(update);
      }
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id/clean', authenticate, async (req, res, next) => {
    const today = new Date();
    const pet = UserPet.getUserPetById(req.params.id);
    const user = req.user.id;
    try {
      if (user.petId === pet.userId) {
        const update = await UserPet.updateUserPetById(req.params.id, {
          cleanliness: today,
        });
        res.send(update);
      }
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
