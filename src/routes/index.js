const express = require('express');

const router = express.Router();

router.use('/user', require('./usersRoutes'));

module.exports = router;