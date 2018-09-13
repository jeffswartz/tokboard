// Dependencies
const fs = require('fs');
const http = require('http');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const IS_PROD = process.env.IS_PROD || false;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const CONVERSATION_ID = 'CON-67617129-e7fc-4d8a-b224-bfee58b7f0e3';

var questionsReceived = [];

if (IS_PROD) {
  const httpsApp = express();
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  httpsApp.use(express.static(path.join(__dirname, 'public')));
  httpsApp.use(bodyParser.json());
  httpsApp.use(bodyParser.urlencoded({ extended: true }));

  httpsApp
    .route('/webhooks/inbound-sms')
    .get(handleInboundSms)
    .post(handleInboundSms);

  const httpsServer = https.createServer(credentials, httpsApp);
  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });

  const io = require('socket.io')(httpsServer);
  io.on('connection', function(socket){
    console.log('a HTTPS user connected');
  });

  function handleInboundSms(request, response) {
    // remote: {"msisdn":"14156290902",
    // "to":"12034569996",
    // "messageId":"0B0000000FCD4831",
    // "text":"hello",
    // "type":"text",
    // "keyword":"HELLO",
    // "message-timestamp":"2018-09-13 05:58:23"}
    const params = Object.assign(request.query, request.body);
    questionsReceived.push(params.text);

    response.status(204).send();
  }
}

const httpApp = express();
if (IS_PROD) {
  console.log('HTTP Server running as prod config, will redirect to HTTPS');
  httpApp.get('*', function (req, res, next) {
      res.redirect('https://tokboard.com' + req.path);
  });
} else {
  console.log('HTTP Server running as dev config, will serve static content');
  httpApp.use(express.static(path.join(__dirname, 'public')));
}

const httpServer = http.createServer(httpApp);
httpServer.listen(IS_PROD ? 80 : 8080, () => {
  console.log('HTTP Server running on port 80');
});
const io = require('socket.io')(httpServer);
io.on('connection', function(socket){
  console.log('a HTTP user connected');
});


function sendToConversation(text) {
  // request({
  //   method: 'PUT',
  //   url: `https://api.nexmo.com/beta/conversations/${CONVERSATION_ID}`,
  //   body: values,
  //   json: true,
  //   headers: {
  //     'User-Agent': 'request'
  //   }
  // }, (err, res, body) => {
  // });
}
