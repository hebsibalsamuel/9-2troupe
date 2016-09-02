var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var fs   = require('fs');
var exec = require('child_process').exec;
var io = require('socket.io')(http);
var request = require('request');
var GitHubApi = require("github");





app.use(express.static(path.join(__dirname,'public')));
io.on('connection',function(socket) {
console.log('Client connected.');
socket.on('message', function(message) {


console.log(message);
  var arr;
 for( var i in message ) {
     if (message.hasOwnProperty('content')){
        arr = message['content'];
     }
 }
  var total = arr.toString();
  //console.log(arr);
  var text = total.split(' ');
  var msg = "";
  var length = parseInt(text.length);


  if(text[0]=='/issue'||text[0]=='\issue'){
//console.log("Inside github");
    var github = new GitHubApi({
        debug: true,
        host: "api.github.com" ,
        followRedirects: false
    });

    github.authenticate({
       type: 'oauth',
       token: message['github_token']
    });

    for(var i=1;i<length;i++){
      msg+=text[i]+" ";
    }

    github.issues.create({
      user:    message['github_user'],
      repo:    message['github_repo'],
      title:    text[1],
      body: msg
    });

  //  var ex=new String("An issue has been raised");
    message['content']="An issue has been raised by " + message['github_user'] + " to " + message['github_repo'];
    request.post(
      {
        url:'http://10.219.93.3:3000/message',
        body:message,
        json:true
      }, function(error,response,body) {
     // console.log(response);
     // console.log(error);
    });
    io.emit('message',message);

  }
  //console.log('Got message',message);
  else{
    request.post(
      {
        url:'http://10.219.93.3:3000/message',
        body:message,
        json:true
      }, function(error,response,body) {
     // console.log(response);
     // console.log(error);
    });
    io.emit('message',message);
  }

});

});
http.listen(8080);
