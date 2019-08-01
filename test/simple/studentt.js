
var test = require('tap').test;
var distributions = require('../../distributions.js');
var equals = require('../equal.js');

var reference = require('../assets/studentt.json');

test('testing student t density function', function (t) {
  equals.absoluteEqual({
    test: t,
    map: reference.pdf,
    fn: (t, df) => distributions.Studentt(df).pdf(t),
    limit: 0.0000005
  });

  t.end();
});

test('testing student t cumulative function', function (t) {
  equals.absoluteEqual({
    test: t,
    map: reference.cdf,
    fn: (t, df) => distributions.Studentt(df).cdf(t),
    limit: 0.0000005
  });

  t.end();
});

test('testing student t inverse function', function (t) {
  equals.absoluteEqual({
    test: t,
    map: reference.ppf,
    fn: (p, df)  => distributions.Studentt(df).inv(p),
    limit: 0.0000005
  });

  equals.absoluteEqual({
    test: t,
    map: [
      [0.0, 15, -Infinity],
      [1.0, 15, +Infinity]
    ],
    fn: (p, df)  => distributions.Studentt(df).inv(p),
    limit: 0.0000005
  });

  t.end();
});

test('testing student t key values', function (t) {
  var studentt = distributions.Studentt(15);

  t.equal(studentt.median(), 0);
  t.equal(studentt.mean(), 0);
  t.equal(studentt.variance(), 15/13);

  t.end();
});
