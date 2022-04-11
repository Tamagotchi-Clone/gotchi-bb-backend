const { Router } = require('express');
const User = require('../models/User');
const { getGithubProfile } = require('../utils/github');
const { exchangeCodeForToken } = require('../utils/github');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res) => {
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);
    const { login, email } = await getGithubProfile(token);
    let user = await User.findByUsername(login);

    if (!user)
      user = await User.insert({
        username: login,
        email,
      });

    const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res
      .cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .redirect('/api/v1/users/dashboard');
  })
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  });
