// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tokboard.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

app.use((req, res) => {
  res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
http.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})

const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, (req, res) => {
  console.log('HTTP Server running on port 80, will redirect to HTTPS');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
