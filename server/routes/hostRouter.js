// External Modules
const express = require('express');
const hostRouter = express.Router();

// Local Modules
const hostController = require('../controllers/hostController');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');
const upload = require('../middleware/upload');

// MY BLOGS
hostRouter.get('/my-blogs', auth.isAuth, hostController.getMyBlogs);

// ADD BLOG
hostRouter.get('/add-blog', auth.isAuth, hostController.getAddBlog);
hostRouter.post(
    '/add-blog',
    auth.isAuth,
    upload.single('coverImage'),
    hostController.postAddBlog
);

// EDIT BLOG
hostRouter.get(
    '/edit-blog/:postId',
    auth.isAuth,
    owner.isOwner,
    hostController.getEditBlog
);

hostRouter.post(
    '/edit-blog/:postId',
    auth.isAuth,
    owner.isOwner,
    upload.single('coverImage'),
    hostController.postEditBlog
);

// DELETE BLOG
hostRouter.post(
    '/delete-blog/:postId',
    auth.isAuth,
    owner.isOwner,
    hostController.postDeleteBlog
);

module.exports = hostRouter;