// External Modules
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Local Modules
const User = require('../models/user');

// Login Page
exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        currentPage: 'login',
        errors: {},
        oldInput: {
            email: ''
        }
    });
};

// Signup Page
exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        currentPage: 'signup',
        errors: {},
        oldInput: {
            name: '',
            username: '',
            email: ''
        }
    });
};

// Signup
exports.postSignup = async (req, res, next) => {
    try {
        const {
            name,
            username,
            email,
            password
        } = req.body;

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(422).render('auth/signup', {
                pageTitle: 'Sign Up',
                currentPage: 'signup',
                errors: validationErrors.mapped(),
                oldInput: {
                    name,
                    username,
                    email
                }
            });
        }

        // Check Email
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(422).render('auth/signup', {
                pageTitle: 'Sign Up',
                currentPage: 'signup',
                errors: {
                    email: {
                        msg: 'Email already exists.'
                    }
                },
                oldInput: {
                    name,
                    username,
                    email
                }
            });
        }

        // Check Username
        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res.status(422).render('auth/signup', {
                pageTitle: 'Sign Up',
                currentPage: 'signup',
                errors: {
                    username: {
                        msg: 'Username already exists.'
                    }
                },
                oldInput: {
                    name,
                    username,
                    email
                }
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

// Login
exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(422).render('auth/login', {
                pageTitle: 'Login',
                currentPage: 'login',
                errors: {
                    email: {
                        msg: 'Invalid email or password.'
                    },
                    password: {
                        msg: 'Invalid email or password.'
                    }
                },
                oldInput: {
                    email
                }
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(422).render('auth/login', {
                pageTitle: 'Login',
                currentPage: 'login',
                errors: {
                    email: {
                        msg: 'Invalid email or password.'
                    },
                    password: {
                        msg: 'Invalid email or password.'
                    }
                },
                oldInput: {
                    email
                }
            });
        }

        req.session.isLoggedIn = true;
        req.session.user = user;

        req.session.save(err => {
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });

    } catch (err) {
        next(err);
    }
};

// Logout
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }

        res.redirect('/');
    });
};