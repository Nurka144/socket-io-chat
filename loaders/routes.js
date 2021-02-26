const Router = require('express');
const router = Router();

const {User} = require('./web-server');

router.get('/users', async (req, res) => {
    let users = await User.find({});
    res.status(200).json(users);
  })

module.exports = router;