const express = require('express');
const router = express.Router();

router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.auth_token
    })
  }
);

module.exports = router;