const {User} = require('./web-server');

module.exports = function(server) {

    var io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:8081",
          }
    });

    let users = [];

    io.on('connection', async function( socket ) {
        socket.join('some room');
        socket.on('login', async ({login}) => {
            const findUser = await User.find({login: login});
            let user;
            if (findUser.length > 0) {
                ({data: user} = await User.updateOne({login: login}, {is_online: 1}));  
            } else {
                let create = new User({login: req.body.login, is_online: 1});
                user = await create.save();
            }
            getUsers()
                .then((users) => {
                    io.to('some room').emit('login', user)
                    io.to('some room').emit('users', users)
                })
            
        })


        const getUsers = async () => {
            return new Promise(async (resolve, reject) => {
                let data = await User.find({});
                resolve(data)
            })
        }

    });

    return io;
};