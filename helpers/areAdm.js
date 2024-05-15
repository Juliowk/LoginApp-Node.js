module.exports = {
     areAdm : function(req, res, next) {
          if (req.isAuthenticated()) {
               return next();
          }
          req.flash("error_msg", "É necessario autenticação como usuário!");
          return res.redirect("/");
     }
}