// http.io.js

class HttpIO {
  constructor(server) {
    this.listeners = new Map();
    server.on('request', this.handleRequest.bind(this));
  }

  // Method to register event listeners
  on(event, callback) {
    this.listeners.set(event, callback);
  }

  // Method to handle incoming HTTP requests
  handleRequest(request, response) {
    let data = '';
  
    request.on('data', (chunk) => {
      data += chunk;
    });
  
    request.on('end', () => {
      if (data.length === 0) {
        console.error('Empty request body');
        this.sendResponse(response, 400, { 'Content-Type': 'text/plain' }, 'Bad Request');
        return;
      }
  
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error(`Error parsing request body: ${error}`);
        this.sendResponse(response, 400, { 'Content-Type': 'text/plain' }, 'Bad Request');
        return;
      }
  
      const event = parsedData.event;
      const message = parsedData.message;
  
      if (!event || !message) {
        console.error('Missing event or message in request body');
        this.sendResponse(response, 400, { 'Content-Type': 'text/plain' }, 'Bad Request');
        return;
      }
  
      if (this.listeners.has(event)) {
        this.listeners.get(event)(message, {
          request,
          response,
        });
      }
    });
  }
  
  // Method to send response back to client
  sendResponse(response, statusCode, headers, data) {
    response.writeHead(statusCode, headers);
    response.write(data);
    response.end();
  }
}

module.exports = HttpIO;
