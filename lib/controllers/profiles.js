const { Router } = require('express');
const Profile = require('../models/Profile');

module.exports = Router()
.post('/', async (req, res, next) => {
    try {
        const profile = await Profile.insert(req.body);
        res.send(profile);
    } catch (error) {
        next(error);
    }
})