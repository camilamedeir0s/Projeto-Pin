const express = require('express');
const GoalController = require('../controllers/GoalController');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.post('/create', GoalController.create);
router.get('/get_one/:goal_id', GoalController.getOne);
router.get('/get_all', GoalController.getAll);
router.put('/update/:goal_id', GoalController.update);
router.put('/complete/:goal_id', GoalController.complete);
router.delete('/delete/:goal_id', GoalController.delete);

module.exports = router;
