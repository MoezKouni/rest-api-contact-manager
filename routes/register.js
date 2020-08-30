const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../model/User')
const genToken = require('../helpers/genToken')


// Register Route
router.post('/', [
    body('firstname', 'we want to know your name!').notEmpty(),
    body('lastname', 'your lastname is required!').notEmpty(),
    body('address', 'please tell us where are your living!').notEmpty(),
    body('age', 'please write your age!').isNumeric(),
    body('sexe', 'are you women, men or neither?').notEmpty(),
    body('email', 'email is required so you can login next!').isEmail(),
    body('password', "write your password, minimum 6 characters and don't forget it!").isLength({min: 6}),
    body('phone', "your phone number, we won't call you, don't worry!").notEmpty()
  ],(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }

    let randomNum = Math.floor(Math.random() * 100) % 40
    let newUser = new User({
      ...req.body,
      avatar: `https://randomuser.me/api/portraits/${req.body.sexe}/${randomNum}.jpg`
    })

    bcrypt.genSalt(10, function(err, salt) {
      if(err) throw err
      bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
          if(err) throw err
          newUser.password = hashedPassword
          newUser.save()
          genToken(newUser, res)
        });
    });

})


module.exports = router