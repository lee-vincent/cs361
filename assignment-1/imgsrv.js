const http = require('http');
const fs = require('fs');
const path = require('path');
const base = "./images/"
const suffix = ".jpg"

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML file
        const htmlFilePath = path.join('./', 'index.html');

        fs.readFile(htmlFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/sse') {
        // Set up SSE
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // Function to periodically read and send the file content
        const filePath = path.join(__dirname, 'image-service.txt'); // Replace with your file path
        const interval = 5000; // Update interval in milliseconds

        const sendFileContent = () => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                } else {
                    let numericData = parseFloat(data);
                    console.log("data:", data);
                    console.log("numericData:", numericData);

                    if (!isNaN(numericData)) {

                        // Ensure 'numericData' is within the range 1 to 30
                        // mdn docs say to do it this form: ((n % d) + d) % d
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
                        numericData = ((numericData % 30) + 30) % 30 + 1;
                        console.log("numericDataModded:", numericData);
                        // Convert 'numericData' to a string
                        data = numericData.toString();
                        // Read the image file
                        const imagePath = `${base}${data}${suffix}`;
                        const imageBuffer = fs.readFileSync(imagePath);
                        // Convert the image to Base64
                        const base64Image = imageBuffer.toString('base64');
                        // Send the Base64 image as text within an SSE event
                        res.write('data: ' + base64Image + '\n');
                        res.write('content-type: image/jpeg\n\n'); // Set the appropriate content type
                    }
                    // think we need to handle if text ??
                }
            });
        };

        // Start sending file content at the specified interval
        const intervalId = setInterval(sendFileContent, interval);

        // Close the connection if the client disconnects
        req.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    } else {
        // Handle other routes here, if needed
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
const hostname = 'localhost';

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
