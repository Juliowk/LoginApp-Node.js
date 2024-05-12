const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

function validatefields(req) {
     const erros = [];
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!req.body.user || !req.body.email || !req.body.password || !req.body.passwordrepeat) {
          erros.push({ texto: "Campos não informados!" });
     } else {
          if (req.body.user.length < 3) {
               erros.push({ texto: "Nome de usuário muito pequeno!" });
          }
          if (!emailRegex.test(req.body.email)) {
               erros.push({ texto: "Formato de email inválido!" });
          }
          if (req.body.password.length < 6) {
               erros.push({ texto: "Senha muito pequena!" });
          }
          if (req.body.passwordrepeat != req.body.password) {
               erros.push({ texto: "As senhas não são iguais!" });
          }
     }

     return erros;
}

function registerUser(req, res) {
     const newUser = {
          user: req.body.user,
          email: req.body.email,
          password: req.body.password
     };

     return new Promise((resolve, reject) => {

          bcrypt.genSalt(10, (error, salt) => {
               if (error) {
                    reject(error);
               } else {

                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                         if (error) {
                              reject(error);
                         } else {

                              newUser.password = hash;
                              new User(newUser).save()
                                   .then(() => {
                                        resolve(true); // Registro bem-sucedido, retorna true
                                   })
                                   .catch((error) => {
                                        resolve(false); // Erro ao registrar, retorna false
                                   });
                         }
                    })
               }
          });
     });
}

router.post("/register", (req, res) => {

     const erros = validatefields(req);

     if (erros.length > 0) {
          res.render("operationsPage/register", { erros: erros });
     } else {

          User.findOne({ email: req.body.email })
               .then((user) => {
                    if (user) {
                         req.flash("error_msg", "Email já cadastrado!");
                         res.redirect("/register");
                    } else {
                         registerUser(req, res)
                              .then((success) => {
                                   if (success) {
                                        console.log("User registered successfully");
                                        req.flash("success_msg", "Usuário criado com sucesso. Faça Login!");
                                        res.redirect("/");
                                   } else {
                                        console.log("Error registering user:", error);
                                        req.flash("error_msg", "Houve um erro ao cadastrar usuário. Tente novamente!");
                                        res.redirect("/register");
                                   }
                              })
                              .catch((error) => {
                                   req.flash("error_msg", "Houve um erro interno!");
                                   res.redirect("/");
                              });
                    }
               })
               .catch((error) => {
                    req.flash("error_msg", "Houve um erro interno!");
                    res.redirect("/");
               });
     };
});

router.post("/login", (req, res) => {

});

router.put("/updateLogin", (req, res) => {

});

router.delete("/deleteLogin", (req, res) => {

});

module.exports = router;