
function absoluteEqual(s) {
  for (var i = 0, l = s.map.length; i < l; i++) {
    var args = s.map[i].slice(0, -1);
    var last = s.map[i][ s.map[i].length - 1 ];
    var ret = s.fn.apply(null, args);

    if (Number.isFinite(last)) {
      s.test.ok(
        Math.abs(ret - last) < s.limit,
        `is ${ret} almost absolute equal ${last}`
      );
    } else {
      s.test.ok(
        Object.is(ret, last),
        `is ${ret} equal ${last}`
      );
    }
  }
}
exports.absoluteEqual = absoluteEqual;

function relativeEqual(s) {
  for (var i = 0, l = s.map.length; i < l; i++) {
    var args = s.map[i].slice(0, -1);
    var last = s.map[i][ s.map[i].length - 1 ];

    if (Number.isFinite(last)) {
      if (last === 0) {
        s.test.ok(
          Math.abs( s.fn.apply(null, args) - last) < s.limit,
          'almost absolute equal'
        );
      } else {
        s.test.ok(
          Math.abs( s.fn.apply(null, args) - last ) / last < s.limit,
          'almost relative equal'
        );
      }
    } else {
      s.test.ok(
        Object.is(s.fn.apply(null, args), last),
        'exact equal'
      );
    }
  }
}
exports.relativeEqual = relativeEqual;
