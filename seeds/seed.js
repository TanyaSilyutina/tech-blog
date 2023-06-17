const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const user = require('./user.json');
const post = require('./post.json');
const comment = require('./comment.json')

const seedDB = async () => {
    await sequelize.sync({force: false});

    await User.bulkCreate(user, {
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
