var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var pick = require('../pick');

describe('pick', function () {
  it('should pick keys from an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(pick(obj, 'bar')).to.deep.equal({
      bar: 1
    });
    expect(pick(obj, ['bar'])).to.deep.equal({
      bar: 1
    });
    expect(pick(obj, 'foo', 'bar')).to.deep.equal({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, ['foo', 'bar'])).to.deep.equal({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, ['foo', 'bar'], 'qux')).to.deep.equal({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, ['foo', 'bar'], ['qux'])).to.deep.equal({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj)).to.deep.equal({});
    expect(pick(obj, [])).to.deep.equal({});
    expect(pick(obj, RegExp('a'))).to.deep.equal({
      bar: 1
    });
    expect(pick(obj, RegExp('a'), 'foo')).to.deep.equal({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, [RegExp('q|b')], 'bar')).to.deep.equal({
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('q'), RegExp('f')], ['bar'])).to.deep.equal({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('q'), 'foo'], 'bar')).to.deep.equal({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('x$'), 'foo'], [RegExp('b')])).to.deep.equal({
      foo: 1,
      bar: 1,
      qux: 1
    });
    done();
  });
  it('should pick keys from objects in an array when used with map', function(done) {
    var objs = [
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3,
        koo: 3,
        goo: 3
      }
    ];
    expect(objs.map(pick('bar'))).to.deep.equal([
      {
        bar: 1
      },
      {
        bar: 2
      },
      {
        bar: 3
      }
    ]);
    expect(objs.map(pick(['bar']))).to.deep.equal([
      {
        bar: 1
      },
      {
        bar: 2
      },
      {
        bar: 3
      }
    ]);
    expect(objs.map(pick('foo', 'bar'))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar']))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar'], 'qux'))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar'], ['qux']))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(RegExp('q|g')))).to.deep.equal([
      {},
      {
        qux: 2
      },
      {
        goo: 3
      }
    ]);
    expect(objs.map(pick(RegExp('BAR', 'i'), 'foo'))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick([RegExp('b')], 'foo'))).to.deep.equal([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick([RegExp('b'), 'qux'], ['foo']))).to.deep.equal([
      {
        bar: 1
      },
      {
        bar: 2,
        foo: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick([RegExp('b'), RegExp('^f')], [RegExp('oo$')]))).to.deep.equal([
      {
        bar: 1
      },
      {
        bar: 2,
        foo: 2
      },
      {
        bar: 3,
        foo: 3,
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(pick())).to.deep.equal([
      {}, {}, {}
    ]);
    expect(objs.map(pick([]))).to.deep.equal([
      {}, {}, {}
    ]);
    done();
  });
});
