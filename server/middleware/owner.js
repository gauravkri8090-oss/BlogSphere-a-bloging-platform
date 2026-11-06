const Post = require('../models/post');

exports.isOwner = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).render('store/404', {
                pageTitle: 'Not Found',
                currentPage: ''
            });
        }

        if (post.author.toString() !== req.session.user._id.toString()) {
            return res.status(403).render('store/403', {
                pageTitle: 'Access Denied',
                currentPage: ''
            });
        }

        req.post = post;
        next();

    } catch (err) {
        next(err);
    }
};