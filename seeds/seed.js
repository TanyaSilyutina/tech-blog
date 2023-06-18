const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const post = require('./post.json');
const comment = require('./comment.json')
const {hash} = require("bcrypt");

const seedDB = async () => {
    const password = await hash("password", 10)
    await sequelize.sync({force: true});

    await User.bulkCreate(["Linda", "Olga", "Taylor"].map(x =>
        (
            {
                username: x,
                email: `${x}@gmail.com`,
                password: password,
            }
        )), {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(post, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(comment, {
        individualHooks: true,
        returning: true,
    });
    process.exit(0);
};

seedDB();
