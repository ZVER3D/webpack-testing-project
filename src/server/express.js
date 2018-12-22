import express from 'express';
import path from 'path';

// Init express
const server = express();
// Require webpack and its config
const webpack = require('webpack');
const config = require('../../config/webpack.dev');
const compiler = webpack(config);

// Setup webpack middleware
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);
// Apply webpack middleware
server.use(webpackDevMiddleware);

// Middleware for hot reloading
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
// Apply hot reloading middleware (should be after webpackDevMiddleware)
server.use(webpackHotMiddleware);

// Setup the public directory
const staticMiddleware = express.static('dist');
// Apply middleware
server.use(staticMiddleware);

// Start the server on port 8080 or heroku port
const port = process.env.port || 8080;
server.listen(port, () => {
    console.log(`Server is ready. Listening on http://localhost:${port}`);
});