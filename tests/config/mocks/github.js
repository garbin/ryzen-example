const nock = require('nock')

nock('https://github.com').post('/login/oauth/access_token', {
  grant_type: 'authorization_code',
  client_id: 'c71a77bfb56efc080bc6',
  client_secret: '65a3bb5ad8adb454cb0435d089459bd27d52e89d',
  code: '5b7469b93ec67d18b57f',
  redirect_uri: 'http://localhost:8000/api/auth/connect/github/callback'
}).reply(201, {
  access_token: 'c289867c51acefe7857a674dd414cd58cf6febd7',
  token_type: 'bearer'
})

nock('https://api.github.com').get('/user').reply(200, {
  id: 111,
  login: 'garbin',
  name: 'Garbin Huang',
  email: 'garbinh@gmail.com',
  avatar_url: 'http://avatar'
})
