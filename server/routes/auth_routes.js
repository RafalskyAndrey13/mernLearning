const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect format of email address').isEmail(),
        check('password', 'Minimum length of password is 5 characters').isLength({min: 6})
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data',
            })
        }

        const {email, password} = request.body;

        const candidate = await User.findOne({email});
        if (candidate){
            return response.status(400).json({message: 'User is already exists'});

        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        
        await user.save();
        response.status(201).json({message: 'User has been created'});
    } catch(e){
        response.status(500).json({message: `Server error: ${e.message}`});
    }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Incorrect format of email address').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data',
            })
        }

        const {email, password} = request.body;
        const user = await User.findOne({email});
        if (!user){
            return response.status(400).json({message: 'User is not found'});
        }
        
        const isPasswordsMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordsMatch){
            return response.status(400).json({message: 'Incorrect password'});
        }

        const token = jwt.sign(
            {
                userId: user.id,
            },
            config.get('jwtSecret'),
            {expiresIn: '1h'},
        )

        response.json({token, userId: user.id})
            
    } catch(e){
        response.status(500).json({message: `Server error: ${e.message}`});
    }
})

module.exports = router;