const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        const { name, email, image, password } = req.body;
        try {
            if(await User.findOne({where: { email: email }})){
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

    },

    getAll: async (req, res) => {

    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    },
}