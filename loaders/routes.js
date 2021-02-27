const Router = require('express');
const router = Router();

const {User,Message} = require('./web-server');

router.get('/users', async (req, res) => {
    let users = await User.find({});
    res.status(200).json(users);
  })


router.get('/message', async (req, res) => {
  let msg = await Message.find().sort({$natruct: 1}).limit(10);
  res.status(200).json(msg)
})


module.exports = router;