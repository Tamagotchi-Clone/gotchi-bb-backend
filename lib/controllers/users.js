const { Router } = require('express');
const { getGithubProfile } = require('../utils/github');
const { exchangeCodeForToken } = require('../utils/__mocks__/github');

module.exports = Router().get('/login', async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
  );
})

.get('/login/callback', async (req, res) => {
const { code } = req.query;
const token = await exchangeCodeForToken(code);
const { email, password } = await getGithubProfile(token);

})
