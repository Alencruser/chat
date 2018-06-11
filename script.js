var express = require('express');
var app = express();

//var fs=require ('fs');

app.set('view engine','ejs');

app.use(express.static('public'))
app.get('/',function(req,res){
	res.render('superchat')
});

server=app.listen(process.env.PORT || 8080);

var io=require('socket.io')(server);

io.on('connection',function(socket){
	socket.username =""
	socket.on('username',function(data){
		socket.username=data.username
	});
	socket.on('msg',function(data){
		io.sockets.emit('msg',{message: data.message,username : socket.username})
	})
});

