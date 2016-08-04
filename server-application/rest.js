var io;

var REST = {};

REST.initialize = function(app) {
  io = require('socket.io')(app);
   
  io.sockets.on('connection', function (socket) {
    console.log('CONNECTED');
    socket.emit('config', { hello: 'world' });
    socket.on('message', function (data) {
      console.log(data);
    });
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });
}

module.exports = REST;