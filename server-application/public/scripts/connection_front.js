// 
var socket = io();
socket.on('config', function (data) {
  console.log(data);
  socket.emit('message', { my: 'data' });
});
