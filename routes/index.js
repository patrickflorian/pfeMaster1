var express = require('express');
var router = express.Router();

const passport = require('passport');


let location = require('../controllers/location');
let user = require('../controllers/user');

let { isLoggedIn, hasAuth } = require('../middleware/hasAuth');

/* Authentication routes. */
router.get('/api/login', user.show_login);
router.get('/api/signup', user.show_signup);
router.post('/api/login', 
	passport.authenticate('local'),
	function(req, res) {
		res.json(req.user);
	});
//router.post('/api/login', user.login);
router.post('/api/signup', user.signup);
/* router.post('/api/logout', user.logout);
router.get('/api/logout', user.logout); */

/** Users routes */
router.get('/api/users' ,passport.authenticate('bearer',{session:false}), user.show_users);
router.get("/api/user/:user_id", passport.authenticate('bearer',{session:false}), user.show_user);

/* router.get('/api/user/:user_id/edit', hasAuth, user.show_edit_user);
 */
router.put('/api/user/:user_id/edit', passport.authenticate('bearer',{session:false}), user.edit_user);

router.delete('/api/user/:user_id/delete', passport.authenticate('bearer',{session:false}), user.delete_user);
//router.post('/api/user/:user_id/delete-json', hasAuth, user.delete_user_json);


/* Location routes. */
router.get('/', location.home); 
router.post('/api/location/'/*, passport.authenticate('bearer',{session:false})*/,  
   location.submit_location
);

router.get('/api/locations', location.show_locations);
router.get("/api/location/:location_id", passport.authenticate('bearer',{session:false}) /*,isLoggedIn*/, location.show_location);

//router.get('/api/location/:location_id/edit', passport.authenticate('bearer',{session:false}), location.show_edit_location);
router.put('/api/location/:location_id/edit', passport.authenticate('bearer',{session:false}), location.edit_location);

router.delete('/api/location/:location_id/delete', passport.authenticate('bearer',{session:false}), location.delete_location);
//router.post('/api/location/:location_id/delete-json', hasAuth, location.delete_location_json);


module.exports = router;
