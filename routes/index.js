var express = require('express');
var router = express.Router();

const passport = require('passport');


let document = require('../controllers/document');
let user = require('../controllers/user');

let { isLoggedIn, hasAuth } = require('../middleware/hasAuth');

const multerConfig = require("../config/multer");


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
/** mettre a jour la photo de profile */
router.post('/api/user/:user_id/image', multerConfig.saveToUploads, (req, res) => {
    return res.json("file uploaded successfully");
});
/* router.get('/api/user/:user_id/edit', hasAuth, user.show_edit_user);
 */
router.put('/api/user/:user_id/edit'/* , passport.authenticate('bearer',{session:false}) */, user.edit_user);

router.delete('/api/user/:user_id/delete'/* , passport.authenticate('bearer',{session:false}) */, user.delete_user);
//router.post('/api/user/:user_id/delete-json', hasAuth, user.delete_user_json);


/* Document routes. */
// router.get('/', document.home); 
router.post('/api/documents'/*, passport.authenticate('bearer',{session:false})*/,  
  document.submit_document
);

router.get('/api/documents', document.show_documents);
router.get("/api/documents/:document_id", passport.authenticate('bearer',{session:false}) /*,isLoggedIn*/, document.show_document);

// //router.get('/api/document/:document_id/edit', passport.authenticate('bearer',{session:false}), document.show_edit_document);
router.put('/api/documents/:document_id/edit', /* passport.authenticate('bearer',{session:false}), */ document.edit_document);

router.delete('/api/documents/:document_id/delete',/*  passport.authenticate('bearer',{session:false}), */ document.delete_document);
router.post('/api/documents/:document_id/delete-json',/*  hasAuth, */ document.delete_document_json);


module.exports = router;
