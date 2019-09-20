// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(3000)
var socketCount = 0;
 
io.sockets.on('connection', function(socket){
    // Socket has connected, increase socket count
    socketCount++;
    // Let all sockets know how many are connected
    io.sockets.emit('users connected', socketCount);
 
    socket.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
        socketCount--;
        io.sockets.emit('users connected', socketCount);
    })
 
    socket.on('new call', function(data){
        // New call arrived, push to all sockets 
        io.sockets.emit('new call', data);
    })
})