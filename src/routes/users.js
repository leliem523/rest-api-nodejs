import express from 'express';

import auth from '../middleware/auth';

import controller from '../controllers/users';

var router = express.Router();

/* GET users listing. */
router.get('/', controller.getUsers);
router.get('/:userId', auth.authentication, controller.getUserById);
router.post('/save', controller.createUser);
router.post('/update', controller.updateUser);
router.get('/delete/:userId', controller.delUserById);
router.post('/login', controller.checkLogin);

export default router;
