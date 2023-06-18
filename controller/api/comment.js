const router = require('express').Router();
const { Comment } = require('../../models');

// localhost/api/comment
// get all comments
router.get("/",async (req, res) => {
    try {
        const data = await Comment.findAll();
        if (!data) {
            res.status(400).json("not found");
        }
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new comment
router.post("/", async(req, res) => {
    try {
        const comment = {
            postId: req.body.postId,
            content: req.body.content,
            userId: req.body.userId,
        }
        const data = await Comment.create(comment);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;