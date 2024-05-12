const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");

router.post("/register", (req, res) => {
     
     var erros = [];
     if (!req.body.user || req.body.user == undefined || req.body.user == null) {
          erros.push({ texto: "Digite um nome de usuário!" });
     } else {
          if (req.body.user.length < 3) {
               erros.push({ texto: "Digite um nome de usuário com mais de 3 caracteres!" });
          };
     };
     if (!req.body.email || req.body.email == undefined || req.body.email == null) {
          erros.push({ texto: "Digite um email!" });
     } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(req.body.email)) {
               erros.push({ texto: "Formato de email inválido!" });
          };
     };
     if (!req.body.password || req.body.password == undefined || req.body.password == null) {
          erros.push({ texto: "Digite uma senha!" });
     } else {
          if (req.body.password.length < 6) {
               erros.push({ texto: "A senha precisa de no mínimo 6 caracteres!" });
          };
     };

     
     if (erros.length > 0) {
          res.render("operationsPage/register", { erros: erros });
     } else {
          const newUser = {
               user: req.body.user,
               email: req.body.email,
               password: req.body.password,
          }
          new User(newUser).save()
               .then(() => {
                    console.log("User registered successfully");
                    req.flash("success_msg", "Usuário criado com sucesso. Faça Login!");
                    res.redirect("/");
               })
               .catch((error) => {
                    console.log("Error registering user");
                    req.flash("error_msg", "Houve um erro ao cadastrar usuário. Tente novamente!");
                    res.redirect("/register");
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