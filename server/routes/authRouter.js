// External Modules
const { Router } = require('express');
const { body } = require('express-validator');

const authRouter = Router();

// Local Modules
const authController = require('../controllers/authController');

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup',
    [
        body('name')
            .trim()
            .isLength({ min: 3, max: 50 })
            .withMessage('Name must be between 3 and 50 characters.'),

        body('username')
            .trim()
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Username can contain only letters and numbers.')
            .isLength({ min: 4, max: 20 })
            .withMessage('Username must be between 4 and 20 characters.'),

        body('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Please enter a valid email address.'),

        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long.')
            .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter.')
            .matches(/[a-z]/)
            .withMessage('Password must contain at least one lowercase letter.')
            .matches(/[0-9]/)
            .withMessage('Password must contain at least one number.')
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage('Password must contain at least one special character.'),

        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }

            return true;
        })
    ],
    authController.postSignup
);

authRouter.post('/logout', authController.postLogout);

module.exports = authRouter;