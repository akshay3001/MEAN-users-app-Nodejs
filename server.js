/**
 * Require all modules and dependencies
 */
const http = require('http');
const app = require('./app');

/**
 * Setting the PORT number by default nodejs will look into enviornment variables for PORT or we setted an default port 3001
 */
const port = process.env.PORT || 3001;

/**
 * Creating server using http's createserver method and passing the middleware to it
 */
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});