const { Router } = require('express');
const UserPet = require('../models/UserPet');
const time = require('../services/time');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
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
  .patch('/hunger', authenticate, async (req, res, next) => {
    //const today = new Date();
    //const pet = req.body.petId;
    //const user = req.user.id;
    //if exists...
    //const today = new Date();
    //userpet.updateById(blahblahid, {hunger: today})
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
  .patch('/:id', async (req, res, next) => {
    try {
      const pet = await UserPet.updateUserPetById(req.params.id, req.body);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const pet = await UserPet.deleteUserPetById(req.params.id);
      res.send(pet);
    } catch (error) {
      next(error);
    }
  });
