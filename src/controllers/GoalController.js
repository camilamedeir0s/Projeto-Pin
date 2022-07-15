const Goal = require('../models/Goal');
const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        const user_id = req.id;
        const { title, description } = req.body;
        try {
            const goal = await Goal.create({ user_id, title, description });
            return res.status(200).json(goal);
        } catch (error) {
            if(!title) return res.status(400).json({error: "title is missing"});
            return res.status(400).json({error: "error creating goal"});
        }

    },

    getOne: async (req, res) => {
        const { goal_id } = req.params;
        try {
            const goal = await Goal.findByPk(goal_id);
            if (!goal) return res.status(400).json({error: "Goal not found"});
            return res.status(200).json(goal);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    getAll: async (req, res) => {
        try {
            const goals = await Goal.findAll();
            if (!goals) return res.status(400).json({error: "Goals not found"});
            return res.status(200).json(goals);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    update: async (req, res) => {
        const { goal_id } = req.params;
        const { title, description } = req.body;
        try {
            const goal = await Goal.update({
                title,
                description
            }, { where: { id: goal_id }, returning: true });
            return res.status(200).json(goal);
        } catch (error) {
            return res.status(400).json({err: error.message});
        }
    },

    delete: async (req, res) => {
        const {goal_id} = req.params;
        try{
            if(!await Goal.findByPk(goal_id)) return res.status(400).json({error: "Goal not found"});
            await Goal.destroy({where:{id: goal_id}});
            return res.status(200).send({ok: "Successfully deleted"});
        } catch (error) {
            return res.status(400).send({ error: "Error on deleting goal" });
        }
    },

    complete: async (req, res) => {
        const { goal_id } = req.params;
        try {
            const goal = await Goal.findByPk(goal_id)
            if(!goal) return res.status(400).json({error: "goal not found"});
            const update = await Goal.update({
                is_complete: !goal.is_complete
            }, {
                where: {id: goal_id}, returning: true
            });
            const user = await User.findOne({ where: { id: goal.user_id } })
            await User.update({
                score: update[1][0].dataValues.is_complete? (user.score +1) : (user.score -1),
            }, {
                where: { id: goal.user_id }
            })
            return res.status(200).json(update);
        } catch (error) {
            return res.status(400).json({err: error.message});
        }
    }
}