const Post = require('../models/post');

// Home
exports.getIndex = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(6);

        res.render('store/index', {
            pageTitle: 'Home',
            currentPage: 'home',
            data: posts
        });
    } catch (err) {
        next(err);
    }
};

// All Blogs
exports.getBlogs = async (req, res, next) => {
    try {
        const search = req.query.q ? req.query.q.trim() : '';

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    body: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }

        const posts = await Post.find(filter)
            .populate('author', 'name username')
            .sort({ createdAt: -1 });

        res.render('store/blogs', {
            pageTitle: 'Blogs',
            currentPage: 'blogs',
            posts,
            search
        });

    } catch (err) {
        next(err);
    }
};

// Single Blog
exports.getSingleBlog = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate('author', 'name username');

        if (!post) {
            return res.status(404).render('store/404', {
                pageTitle: 'Blog Not Found',
                currentPage: 'blogs'
            });
        }

        res.render('store/singleBlog', {
            pageTitle: post.title,
            currentPage: 'blogs',
            post
        });
    } catch (err) {
        res.status(404).render('store/404', {
            pageTitle: 'Blog Not Found',
            currentPage: 'blogs'
        });
    }
};

// About
exports.getAbout = (req, res) => {
    res.render('store/about', {
        pageTitle: 'About',
        currentPage: 'home'
    });
};

// Contact
exports.getContact = (req, res) => {
    res.render('store/contact', {
        pageTitle: 'Contact',
        currentPage: 'home'
    });
};