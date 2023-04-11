
# `netConnect.io` Module

`netConnect.io` is a powerful Node.js module that provides a simple and efficient way to handle incoming HTTP requests and register event listeners. With `netConnect.io`, you can easily build scalable and robust server-side applications that communicate over HTTP.
## Installion
To install this package and use it, you need to first install `http` module:
```bash
$ npm install http
```
then, you need to install netConnect.io package:
```bash
$ npm install netconnect-io
```
## Usage

### For Server

```javascript
const netConnectIO = require('netconnect-io');

// Create an HTTP server
const server = http.createServer();

// Create an instance of netConnectIO with the server
const netConnectIO = new netConnectIO(server);

// Register an event listener
netConnectIO.on('event', (message, { request, response }) => {
  // Handle the event here
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```
### For Client
```javascript
const http = require('http');

const data = JSON.stringify({
  event: 'eventName',
  message: 'Hello from client!',
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`Response status code: ${res.statusCode}`);
  console.log(`Response headers: ${JSON.stringify(res.headers)}`);

  res.on('data', (chunk) => {
    console.log(`Response body: ${chunk.toString()}`);
  });
});

req.on('error', (error) => {
  console.error(`Request error: ${error.message}`);
});

req.write(data);
req.end();
```
## API

The api can be find in [`API.MD`](API.md) file.
