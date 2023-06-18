const express = require('express');
const router = express.Router();
const {Post} = require('../models');

// get all posts
router.get('/', async (req, res) => {
    const data = await Post.findAll();
    const post = data.map(i => i.get({plain: true}));
    res.render("posts", {
        post: post
    })
});

// get a specific post
router.get('/post/:id', async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id);
        const post = data.get({plain: true});
        res.render('post', post)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get login page
router.get("/login", (req, res) => {
    res.render("login", {
        logged_in: req.session.logged_in,
    });
})

module.exports = router;