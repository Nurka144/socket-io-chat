const {User} = require('./web-server');

module.exports = function(server) {

    var io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:8081",
          }
    });

    let usersTyping = [];

    

    io.on('connection', async function( socket ) {
        console.log(socket.handshake.auth)
        if (socket.handshake.auth) {
            socket.join(`room-${socket.handshake.auth.id}`)
        }
        // socket.on('login', async ({login}) => {
        //     const findUser = await User.find({login: login});
        //     let user;
        //     if (findUser.length > 0) {
        //         user = await User.updateOne({login: login}, {is_online: 1});
        //         user = findUser[0]  
        //     } else {
        //         let create = new User({login: req.body.login, is_online: 1});
        //         user = await create.save();
        //     }
        //     getUsers()
        //         .then((users) => {
        //             socket.join(`room-${user._id}`)
        //             socket.emit('login', user)
        //             socket.emit('users', users)
        //         })
            
        // })

        socket.on('logout', async ({id}) => {
            await User.updateOne({_id: id}, {is_online: 0})
            getUsers()
                .then((users) => {
                    socket.emit('users', users)
                })
        })

        socket.on('typing', ({auth, state}) => {
            if (state) {
                usersTyping.push(auth.login)
            } else {
                usersTyping.map((item, index) => {
                    if (item == auth.login) {
                        usersTyping.splice(index, 1)
                    }
                })
            }
            socket.broadcast.emit('typingUsers', usersTyping)
        })

        socket.on("message", ({content, to}) => {
            console.log(socket)
            let roomId = to.id
            console.log(`room-${roomId}`)
            socket.to(`room-${roomId}`).emit("private message", {
                content,
                from: socket.handshake.auth.id,
              });
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