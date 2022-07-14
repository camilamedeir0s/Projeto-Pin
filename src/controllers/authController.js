const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({ where: { email: email }, attributes: ['id', 'name', 'email', 'password'] });
            if(!user) return res.status(400).json({ error: "User not found" });
            if(!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid email or password' });

            const { id, name } = user;
            const token = jwt.sign({ id: id }, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN,
              });
            res.set('Authorization', token);
            return res.status(200).json({
                user: {
                    id,
                    name
                },
                token: token
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'Failed on login' });
        }
    },
}