let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} });
}


const rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', { formData: req.body, errors: errors });
}

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            rerender_signup(errors, req, res, next);
        } else {
            return models.User.findOne({
                where: {
                    is_admin: true
                }
            }).then(user => {
                let newUser;
                if (user !== null) {
                    newUser = models.User.build({
                        email: req.body.email,
                        password: generateHash(req.body.password)
                    });
                } else {
                    newUser = models.User.build({
                        email: req.body.email,
                        password: generateHash(req.body.password),
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        profession: req.body.profession,
                        is_admin: true
                    });
                } 
                return newUser.save().then(result => {
                    res.json(result);
                })
            })
        }
    })
}
exports.login = function(req, res, next) {
   
    /* passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/api/login',
            failureFlash: true
        })(req, res, next); */

   /*passport.authenticate('local'),
   function(req, res) {
      res.json(req.user);
   }*/
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
exports.show_users = function(req, res, next) {
    models.User.findAll().then(users => {
      res.json(users);
      /* res.render('user/users', {title: 'Express', users: users}); */
    })
  }

  exports.show_user = function(req, res, next) {
    return models.User.findOne({
      where : {
        id :req.params.user_id
      }
    }).then(user => {
      res.json(user);
      // res.render('user/user', {user: user});
    })
  }
  exports.edit_user = function(req, res, next) {
    /* req.params.user_id
    req.body.username
    req.body.user_firstname
    req.body.user_lastname
    req.body.user_email
    req.body.user_password
    req.body.user_is_admin */

    return models.User.update({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password:req.body.password,
      is_admin:req.body.is_admin
    }, {
      where: {
        id: req.params.user_id
      }
    }).then(result => {
      res.json(result);
    })
  }

  exports.delete_user = function(req, res, next) {
    return models.User.destroy({
      where: {
        id: req.params.user_id
      }
    }).then(result => {
      res.json(result);
    })
  }
