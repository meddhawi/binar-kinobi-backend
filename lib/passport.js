require('dotenv').config();

const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Users } = require('../models')
/* Passport JWT Options */
const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET_KEY,
   }
    // Implementasi passport-jwt
   passport.use(new JwtStrategy(options, async (payload, done) => {
    Users.findByPk(payload.id)
      .then(user => done(null, user))
      .catch(err => done(err, false))
   }))
   
   module.exports = passport