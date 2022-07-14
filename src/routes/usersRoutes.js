const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.post('/create', UserController.create);

router.use(authMiddleware);
router.post('/update/:user_id', UserController.update);
router.get('/get_one/:user_id', UserController.getOne);
router.get('/get_all', UserController.getAll);
router.delete('/delete/:user_id', UserController.delete);

module.exports = router;
