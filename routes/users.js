const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('./../models/user');
const authenticationMiddleware = require('../middlewares/authentication');

// base route /users

// registration
router.post('/', async (req, res, next) => {
    const user = await User.create(req.body);
    if(!user) return next(createError(404));
    res.send(user);
});

// login
router.post('/authenticate', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error('missing params');
        const user = await User.findOne({ username });
        if (!user) throw new Error('Not A user');
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) throw new Error('Wrong password');
        const token = await user.generateToken();
        res.send({
            token,
            user
        })
    } catch (err) {
        next(createError(400, err.message));
    }
});

router.use(authenticationMiddleware);

router.get('/profile', (req, res) => {
    res.send("profile");
});

module.exports = router;