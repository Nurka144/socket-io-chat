module.exports = function(server) {

    var io = require('socket.io')(server);
    io.on('connection', function( client ) {
        console.log(client.id) //this will now work
       client.on('disconnect', function( id ) { 
           console.log('user with ID ' + id + ' has disconnected');
       });
    });

    return io;
};