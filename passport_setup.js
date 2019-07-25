let LocalStrategy = require('passport-local').Strategy;
let BearerStrategy = require('passport-http-bearer').Strategy;

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;
let config = require('./controllers/config');

let models = require('./models');
let flash = require('connect-flash');

const validPassword = function(user, password) {
   return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
   passport.serializeUser(function(user, done) {
      done(null, user.id)
   });

   passport.deserializeUser(function(id, done) {
      models.User.findOne({
         where: {
            'id' : id
         }
      }).then(user => {
         if (user == null) {
            done(new Error('Wrong user id.'))
         }
         done(null, user);
      })
   });

   passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
   },
   function(req, email, password, done) {
      return models.User.findOne({
         where: {
            'email' : email
         },
      }).then(user => {
         if (user == null) {
            req = flash('message', 'Incorrect credentials.')
            return done(null, false)
         } else if (user.password == null || user.password == undefined) {
            req = flash('message', 'You must reset your password')
            return done(null, false)
         } else if (!validPassword(user, password)) {
            req = flash('message', 'Incorrect credentials.')
            return done(null, false)
         }
         console.log(user);
        
         return done(null, user);
      }).catch(err => {
         done(err, false);
      })
   }));
   passport.use(new BearerStrategy(
      function(token,done){
         models.User.findOne({where:{token:token}}).then((user,err,)=>{
            if(err) { return done(err);}
            if(!user) { return done(null,false); }
            else {return done(null, user);}
         });
      }
   ));
}