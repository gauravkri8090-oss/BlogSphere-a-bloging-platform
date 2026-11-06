// external modules
const express = require('express');
const storeRouter = express.Router();

// local modules
const storeController = require('../controllers/storeController');

// Home
storeRouter.get('/', storeController.getIndex);

// All Blogs
storeRouter.get('/blogs', storeController.getBlogs);

// Single Blog
storeRouter.get('/blogs/:postId', storeController.getSingleBlog);

// About
storeRouter.get('/about', storeController.getAbout);

// Contact
storeRouter.get('/contact', storeController.getContact);

module.exports = storeRouter;