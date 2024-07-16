const express = require('express');
var router = express.Router()

router.get('/logout', (req, res,next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  });
module.exports = router