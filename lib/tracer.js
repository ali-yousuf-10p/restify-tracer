'use strict';

const _ = require('lodash');

module.exports = (options) => {
  options = options || {};
  let payloadLimit = options.limit || 1024;
  let hiddenFields = options.hide || [];

  return (req, res, next) => {
    req._startTime = new Date().valueOf();

    let payload = !req.body ? null : payloadLimit && _.size(req.body) > payloadLimit ? '--too-large--' : _.cloneDeep(req.body);

    for (let field of hiddenFields) {
      if (_.result(payload, field)) {
        payload[field] = '--hidden--';
      }
    }

    function traceRequest() {
      res.removeListener('finish', traceRequest);
      res.removeListener('close', traceRequest);

      let responseTime = new Date().valueOf() - req._startTime;
      req.log.info({ payload, req, responseTime }, 'Request');
    }

    res.on('finish', traceRequest);
    res.on('close', traceRequest);

    next();
  };
};
