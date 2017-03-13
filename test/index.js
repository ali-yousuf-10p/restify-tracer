'use strict';

const restify = require('restify');
const server = restify.createServer();
const tracer = require('../');

server.use(restify.bodyParser());
server.use(restify.requestLogger(), tracer({ limit: 500, hide: ['hella'] }));
server.post('/', (req, res) => {
  res.send('Hello');
});

server.listen(1234, () => {
  console.log('Server started');
});
