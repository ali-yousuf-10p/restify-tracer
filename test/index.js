const restify = require('restify');
const tracer = require('..');

const server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.requestLogger(), tracer({ limit: 500, hide: ['user.email', 'password'] }));
server.post('/', (req, res) => {
  res.send('Hello');
});

server.listen(1234);
