const cloudinary = require('../config/cloudinary');
const Post = require('../models/post');

// My Blogs
exports.getMyBlogs = async (req, res, next) => {
    try {
        const posts = await Post.find({
            author: req.session.user._id
        }).sort({ createdAt: -1 });

        res.render('host/myBlogs', {
            pageTitle: 'My Blogs',
            currentPage: 'myBlogs',
            posts
        });
    } catch (err) {
        next(err);
    }
};

// Add Blog Page
exports.getAddBlog = (req, res) => {
    res.render('host/addEditBlog', {
        pageTitle: 'Add Blog',
        currentPage: 'addBlog',
        editing: false,
        post: {}
    });
};

// Add Blog
exports.postAddBlog = async (req, res, next) => {
    try {
        const { title, body } = req.body;

        const post = new Post({
            title,
            body,
            author: req.session.user._id,
            coverImage: req.file ? req.file.path : '',
            coverImageId: req.file ? req.file.filename : ''
        });

        await post.save();

        res.redirect('/host/my-blogs');
    } catch (err) {
        next(err);
    }
};

// Edit Blog Page
exports.getEditBlog = (req, res) => {
    res.render('host/addEditBlog', {
        pageTitle: 'Edit Blog',
        currentPage: 'myBlogs',
        editing: true,
        post: req.post
    });
};

// Update Blog
exports.postEditBlog = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.redirect('/404');
        }

        post.title = req.body.title;
        post.body = req.body.body;

        if (req.file) {

            // Delete old image
            if (post.coverImageId) {
                await cloudinary.uploader.destroy(post.coverImageId);
            }

            post.coverImage = req.file.path;
            post.coverImageId = req.file.filename;
        }

        await post.save();

        res.redirect('/host/my-blogs');
    } catch (err) {
        next(err);
    }
};

// Delete Blog
exports.postDeleteBlog = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.redirect('/404');
        }

        if (post.coverImageId) {
            await cloudinary.uploader.destroy(post.coverImageId);
        }

        await Post.findByIdAndDelete(post._id);

        res.redirect('/host/my-blogs');
    } catch (err) {
        next(err);
    }
};