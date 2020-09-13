const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//  @route          GET api/auth
//@desc             Get logged in user
//@access           Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        await res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//  @route          POST api/auth
//@desc             Auth user and get token
//@access           Public
router.post('/', [
//    checking for valid email and password
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(!user){
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
            // bcrypt.compare returns a promise so we return await: A promise is an object that may produce a single value some time in the future, we use await to make the function block (ONLY) wait for the response before executing
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid Password' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                expiresIn: 360000
            },
                (err, token) => {
                if(err) throw error;
                res.json({ token });
            }
        );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


module.exports = router;
