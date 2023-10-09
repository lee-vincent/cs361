// const http = require('http');
// const fs = require('fs');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Server is running\n');
// });

// // Specify the file path you want to monitor
// const filePath = 'image-service.txt';

// // Function to periodically check the file content
// function checkFileContent() {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return;
//     }

//     // Perform checks on the file content here
//     console.log('File content:', data);
//   });
// }

// // Set the interval for checking the file (e.g., every 5 seconds)
// const interval = 5000; // 5 seconds

// // Start checking the file at the specified interval
// setInterval(checkFileContent, interval);

// // Listen on a specific port and host
// const port = 3000;
// const hostname = 'localhost';

// server.listen(port, hostname, () => {
//   console.log(`Server is running at http://${hostname}:${port}/`);
// });


const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running\n');
});

// Specify the file path you want to monitor
const filePath = 'image-service.txt';

// Function to send updates to the client
function sendFileContentToClient(response) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Send the file content to the client
    response.write(`data: ${data}\n\n`);
  });
}

// Set up the SSE endpoint
server.on('request', (req, res) => {
  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Periodically send updates to the client
    const interval = setInterval(() => {
      sendFileContentToClient(res);
    }, 5000); // Every 5 seconds

    // Close the connection if the client disconnects
    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }
});

// Listen on a specific port and host
const port = 3000;
const hostname = 'localhost';

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
