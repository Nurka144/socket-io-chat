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

router.post('/login', async (req, res) => {
    const findUser = await User.find({login: req.body.login});
    let user;
    if (findUser.length > 0) {
        user = await User.updateOne({login: req.body.login}, {is_online: 1});
        user = findUser[0]  
    } else {
        let create = new User({login: req.body.login, is_online: 1});
        user = await create.save();
    }
    res.status(200).json(user);
})

module.exports = router;