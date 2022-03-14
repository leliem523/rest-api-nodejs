var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', controller.getUsers);
router.get('/:userId', auth.authentication, controller.getUserById);
router.post('/save', controller.createUser);
router.post('/update', controller.updateUser);
router.get('/delete/:userId', controller.delUserById);
router.post('/login', controller.checkLogin);

module.exports = router;
