require('dotenv').config();

// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

// Local Modules
const rootDir = require('./utils/path');
const connectDB = require('./server/config/db');

const storeRouter = require('./server/routes/storeRouter');
const authRouter = require('./server/routes/authRouter');
const hostRouter = require('./server/routes/hostRouter');

// App Initialization
const app = express();
const PORT = process.env.PORT || 3001;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
app.set('layout', './layouts/main');

// Global Middlewares
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),

        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

app.use(express.static(path.join(rootDir, 'public')));

// Global Variables
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.user = req.session.user || null;
    res.locals.currentPage = '';

    next();
});

// Routes
app.use(storeRouter);
app.use(authRouter);
app.use('/host', hostRouter);

// 404
app.use((req, res) => {
    res.status(404).render('store/404', {
        pageTitle: '404 - Page Not Found',
        currentPage: ''
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render('store/500', {
        pageTitle: 'Server Error',
        currentPage: ''
    });
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('Failed to start server');
        console.error(err);
    }
};

startServer();