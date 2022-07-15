const express = require('express');

const router = express.Router();

router.use('/user', require('./usersRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/goal', require('./goalsRoutes'));

module.exports = router;