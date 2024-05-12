const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
     passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {

          User.findOne({ email: email })
               .then((user) => {
                    if (!user) {
                         return done(null, false, { message: "Está conta não existe" });
                    }

                    bcrypt.compare(password, user.password, (error, success) => {
                         if (success) {
                              return done(null, user);
                         } else {
                              return done(null, false, { message: "Senha incorreta" });
                         }
                    })
               })
     }));

     passport.serializeUser((user, done) => {
          done(null, user.id);
     });

     passport.deserializeUser((id, done) => {
          User.findById(id)
               .then((user) => {
                    done(null, user);
               })
               .catch((error) => {
                    done(null, false, {msg: "Algo deu erro"});
               })
     });
}