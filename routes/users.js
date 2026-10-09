const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();
const userFilePath = path.join(__dirname, '..', 'user.json');

function readUser() {
  const fileContent = fs.readFileSync(userFilePath, 'utf8');
  return JSON.parse(fileContent);
}

routerUser.get('/profile', (req, res, next) => {
  try {
    res.json(readUser());
  } catch (err) {
    next(err);
  }
});

routerUser.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = readUser();

    if (username !== user.username) {
      return res.json({
        status: false,
        message: 'User Name is invalid'
      });
    }

    if (password !== user.password) {
      return res.json({
        status: false,
        message: 'Password is invalid'
      });
    }

    return res.json({
      status: true,
      message: 'User Is valid'
    });
  } catch (err) {
    next(err);
  }
});

routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.type('html').send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;
