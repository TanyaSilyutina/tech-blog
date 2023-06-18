const router = require('express').Router();
const {Post} = require('../../models');

// localhost/api/post

// get posts
router.get("/", async (req, res) => {
    try {
        const data = await Post.findAll();
        if (!data) {
            res.status(400).json("not found");
        }
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err)
    }
});

// create a new post
router.post('/', async (req, res) => {
    try {
        const data = Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// edit a post
router.put('/:id', async (req, res) => {
    try {
        const data = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            }, {
                where: {
                    id: req.params.id,
                }
            });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a post
router.delete("/delete/:id", async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
    } catch (err) {
        res.status(500).json(err);
    }
    res.status(200).json({});
});



module.exports = router;