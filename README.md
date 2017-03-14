# restify-tracer
Restify request payload and response time logging middleware


## Options
| Option 	| Description                     | Default |
|---------|---------------------------------|---------|
| `limit`	| Payload size limit in bytes.<br>Use `-1` for no limit. | `-1` |
| `hide`	| List of parameters to hide when logging. <br>See [_.get](https://lodash.com/docs/#get). | `[]` |

## Usage
```javascript
'use strict';

const restify = require('restify');
const tracer = require('restify-tracer');

const server = restify.createServer();

server.use(restify.bodyParser()); // use body parser to enable `hide` feature
server.use(restify.requestLogger(), tracer({
  limit: 1024,
  hide: ['user.email', 'password']
}));

server.post('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3000);
```
