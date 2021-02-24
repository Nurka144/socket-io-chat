const {User} = require('./web-server');

module.exports = function(server) {

    var io = require('socket.io')(server);
    io.on('connection', function( client ) {
        console.log(client.id) //this will now work
        client.on('disconnect', function( id ) { 
            console.log('user with ID ' + id + ' has disconnected');
        });
        client.on('getAllUsers', async function() {
            const users = await User.find({});
            client.emit('returnAllUsers', users)
        })
    });

    return io;
};