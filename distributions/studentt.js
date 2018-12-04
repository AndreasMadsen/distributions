
var cephes = require('cephes');

function StudenttDistribution(df) {
  if (!(this instanceof StudenttDistribution)) {
    return new StudenttDistribution(df);
  }

  if (typeof df !== 'number') {
    throw TypeError('mean must be a number');
  }
  if (df <= 0) {
    throw RangeError('df must be a positive number');
  }

  this._df = df;

  this._pdf_const = (cephes.gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * cephes.gamma(df / 2)));
  this._pdf_exp = -((df + 1) / 2);

  this._df_half = df / 2;
}
module.exports = StudenttDistribution;

StudenttDistribution.prototype.pdf = function (x) {
  return this._pdf_const * Math.pow(1 + ((x*x) / this._df), this._pdf_exp);
};

StudenttDistribution.prototype.cdf = function (x) {
  return cephes.stdtr(this._df, x);
};

StudenttDistribution.prototype.inv = function (p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  return cephes.stdtri(this._df, p);
};

StudenttDistribution.prototype.median = function () {
  return 0;
};

StudenttDistribution.prototype.mean = function () {
  return (this._df > 1) ? 0 : undefined;
};

StudenttDistribution.prototype.variance = function () {
  if (this._df > 2) return this._df / (this._df - 2);
  else if (this._df > 1) return Infinity;
  else return undefined;
};
