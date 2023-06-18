const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const bcrypt = require('bcrypt');
const existsError = {
    error: true,
    message: 'An account already exists for the user with this email address',
};

// localhost/api/user
// get all users
router.get("/", async (req, res) => {
    try {
        const data = await User.findAll(
            {
                include: [Post]
            }
        );
        if (!data) {
            res.status(400).json("not found");
        }
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err)
    }
});

// create new user
router.post('/', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            error: true,
            message: 'email or password field are missing',
        });
        return;
    }

    let user = await User.findOne({
        where: {
            email: req.body.email.toLowerCase()
        }
    });
    if(user) {
        res.status(409).send(existsError);
        return;
    }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if(password.length === 0) {
        res.status(400).send({
            error: true,
            message: 'Password cannot be empty',
        })
        return;
    }

    // hash password, store in variable
    const hash = await bcrypt.hash(password, 10);

    try {
        const data = await User.create({
            username: req.body.username,
            email: email,
            password: hash,
        });

        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.logged_in = true;

            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login credentials validation
router.post('/login', async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!data) {
            res.status(400).json({
                message: 'No user found with the provided email'
            });
            return;
        }

        const password = data.checkPassword(req.body.password);

        if (!password) {
            res.status(400).json({message: 'The password does not match our records'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.logged_in = true;

            res.json({
                user: data,
                message: 'Login successful'
            });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;