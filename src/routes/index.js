import express from 'express';

import user from './users';

var router = express.Router();

/* GET home page. */
router.use('/users', user);

export default router;
