const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        const { name, email, image, password } = req.body;
        try {
            if (await User.findOne({where: { email: email }})){
                return res.status(400).send({ error: 'email already exists' });
            }
            const user = await User.create({ name, email, image, password});
            return res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'user registration error' });
        }
    },

    getOne: async (req, res) => {
        const {user_id} = req.params;
        try {
            const user = await User.findByPk(user_id);
            if (!user) return res.status(400).json({error: "User not found"});
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.findAll();
            if (!users) return res.status(400).json({error: "Users not found"});
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    update: async (req, res) => {
        const { user_id } = req.params;
        const { name, email, image } = req.body;
        try{
            if(!await User.findByPk(user_id)) return res.status(400).json({error: "User not found"});
            const update = await User.update({ 
                name: name,
                email: email,
                image: image
            }, { where: { id: user_id }, returning: true });
            let data = update[1];
            data[0].dataValues.password = undefined;
            data[0].dataValues.password_reset_token = undefined;
            return res.status(200).json(update[1]);
        } catch (error) {
            return res.status(400).json({err: error.message}); 
        }
    },

    delete: async (req, res) => {
        const {user_id} = req.params;
        try{
            if(!await User.findByPk(user_id)) return res.status(400).json({error: "User not found"});
            await User.destroy({where:{id: user_id}});
            return res.status(200).send({ok: "Successfully deleted"});
        } catch (error) {
            return res.status(400).send({ error: "Error on deleting user" });
        }
    },
}