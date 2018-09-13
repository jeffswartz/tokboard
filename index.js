// Dependencies
const fs = require('fs');
const http = require('http');
const path = require('path');
const https = require('https');
const express = require('express');
const IS_PROD = process.env.IS_PROD || false;


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
  const httpsServer = https.createServer(credentials, httpsApp);
  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}

const httpApp = express();
if (IS_PROD) {
  console.log('HTTP Server running as prod config, will redirect to HTTPS');
  httpApp.get('*', function (req, res, next) {
      res.redirect("https://tokboard.com" + req.path);
  });
} else {
  console.log('HTTP Server running as dev config, will serve static content');
  httpApp.use(express.static(path.join(__dirname, 'public')));
}
const httpServer = http.createServer(httpApp);
httpServer.listen(8080, () => {
  console.log('HTTP Server running on port 80');
});

