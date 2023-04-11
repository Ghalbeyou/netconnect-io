# HttpIO API

## Class: HttpIO

The `HttpIO` class provides a simple way to handle incoming HTTP requests and register event listeners.

### Constructor

#### `new HttpIO(server)`

- `server` \<http.Server\> The HTTP server instance to listen for requests on.

Creates a new `HttpIO` instance and attaches event listeners to the specified HTTP server instance.

### Methods

#### `on(event, callback)`

- `event` \<string\> The event to listen for.
- `callback` \<Function\> The callback function to be invoked when the event is triggered.

Registers an event listener for the specified event.

#### `handleRequest(request, response)`

- `request` \<http.IncomingMessage\> The incoming HTTP request object.
- `response` \<http.ServerResponse\> The HTTP response object.

Handles incoming HTTP requests by parsing the request body, triggering registered event listeners, and sending appropriate responses.

#### `sendResponse(response, statusCode, headers, data)`

- `response` \<http.ServerResponse\> The HTTP response object.
- `statusCode` \<number\> The status code to send in the response.
- `headers` \<object\> The headers to send in the response.
- `data` \<string\> The data to send in the response body.

Sends a response back to the client with the specified status code, headers, and data.

```javascript
// Example usage

const HttpIO = require('./http.io');

// Create an HTTP server
const server = require('http').createServer();

// Create a new HttpIO instance
const httpIO = new HttpIO(server);

// Register an event listener for 'event1'
httpIO.on('event1', (message, context) => {
  // Handle the 'event1' event
  // Access the request and response objects from the context
  const request = context.request;
  const response = context.response;

  // Send a response back to the client
  httpIO.sendResponse(response, 200, { 'Content-Type': 'text/plain' }, 'Hello, world!');
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
