const {User} = require('./web-server');

module.exports = function(server) {

    var io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:8081",
          }
    });

    let users;
    io.on('connection', async function( client ) {
        console.log(client.id) //this will now work
        listUsers();

        client.on('connect', function() {
            listUsers()
            client.emit('users', users)
        })

        client.on('disconnect', async function( id ) {
            // await User.updateOne({_id: id}, {is_online: 0})
            console.log('user with ID ' + id + ' has disconnected');
            listUsers()
        });

        client.on('logon', async function(id) {
            await User.updateOne({_id: id}, {is_online: 0})
            listUsers()
            console.log(users)
            client.emit('users', users)
        })

        async function listUsers() {
            users = await User.find({});
        }


    });

    return io;
};