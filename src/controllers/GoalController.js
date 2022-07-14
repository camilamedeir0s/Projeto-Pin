const Goal = require('../models/Goal');

module.exports = {
    create: async (req, res) => {
        const user_id = req.id;
        const { title, description, value } = req.body;
        try {
            const goal = await Goal.create({ user_id, title, description, value });
            return res.status(200).json(goal);
        } catch (error) {
            if(!title) return res.status(400).json({error: "title is missing"});
            return res.status(400).json({error: "error creating user"});
        }

    },

    getOne: async (req, res) => {
        const {goal_id} = req.params;
        try {
            const goal = await Goal.findByPk(goal_id);
            if (!goal) return res.status(400).json({error: "Goal not found"});
            return res.status(200).json(user);
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
        const { title, description } = req.body;
        try {
            
        } catch (error) {

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

    complete: {
        //att pontos
    }

}