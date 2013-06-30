
var files = ['normal', 'uniform', 'studentt'];

for (var i = 0, l = files.length; i < l; i++) {
  var fns = require('./distributions/' + files[i] + '.js');
  var keys = Object.keys(fns);

  for (var n = 0, r = keys.length; n < r; n++) {
    exports[ keys[n] ] = fns[keys[n]];
  }
}
