const _ = require('lodash');

module.exports = (options) => {
  const opts = options || {};
  const payloadLimit = opts.limit || -1;
  const hiddenFields = opts.hide || [];

  return (req, res, next) => {
    const startTime = new Date().valueOf();

    const isPayloadBig = payloadLimit > -1 && _.size(req.body) > payloadLimit;
    const payload = isPayloadBig ? '--too-big--' : _.cloneDeep(req.body);

    if (typeof payload === 'object') {
      hiddenFields.forEach((field) => {
        if (_.get(payload, field)) {
          _.set(payload, field, '--hidden--');
        }
      });
    }

    function traceRequest() {
      res.removeListener('finish', traceRequest);
      res.removeListener('close', traceRequest);

      const responseTime = new Date().valueOf() - startTime;
      req.log.info({ payload, req, responseTime }, 'Request');
    }

    res.on('finish', traceRequest);
    res.on('close', traceRequest);

    next();
  };
};
