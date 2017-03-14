const chai = require('chai');
const sinon = require('sinon');
const tracer = require('..');

const expect = chai.expect;

const req = {
  log: {
    info: (fields, msg) => {

    }
  }
};

const next = () => {};

describe('tracer()', () => {
  let spyLog;
  let spyNext;

  beforeEach(() => {
    spyLog = sinon.spy(req.log, 'info');
    spyNext = sinon.spy(next);
  });

  afterEach(() => {
    spyLog.restore();
    spyNext.restore();
  });

  it('should return a function when no parameters are provided', (done) => {
    const middleware = tracer();
    expect(middleware).to.be.a('function');
    done();
  });

  it('should return a function when options is an object', (done) => {
    const middleware = tracer.bind(this, {});
    expect(middleware).to.be.a('function');
    done();
  });

  it('should throw an exception when options is not an object', (done) => {
    const middleware = tracer.bind(this, 'random');
    expect(middleware).to.throw(Error);
    done();
  });
});