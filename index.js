var http = require('http');

http.createServer(function(request, response){
  response.end('Hello Node JS Server Response');
}).listen(80);
