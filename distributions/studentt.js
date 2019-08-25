
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

  this._pdf_const = Math.exp(cephes.lgam((df + 1) / 2) - cephes.lgam(df / 2)) / Math.sqrt(this._df * Math.PI);
}
module.exports = StudenttDistribution;

StudenttDistribution.prototype.pdf = function (x) {
  return this._pdf_const / Math.pow(1 + ((x*x) / this._df), (this._df + 1) / 2);
};

// Uses the idendenity specified in Abramowitz and Stegun 26.7.1 and
// Abramowitz and Stegun 26.5.27.
// F(x|df) = 1 - 0.5 * I_z (df/2, 1/2)
//       z = df / (df + x^2)
//     for   x > 0
// Since the Student-t distribution is symetric:
// F(x|df) = 0.5 * I_z (df/2, 1/2)
//     for   x < 0
StudenttDistribution.prototype.cdf = function (x) {
  const z = this._df / (this._df + x * x);
  const p = 0.5 * cephes.incbet(0.5 * this._df, 0.5, z);
  return (x <= 0) ? p : 1 - p;
};

StudenttDistribution.prototype.inv = function (p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  if (p > 0.25 && p < 0.75) {
    const phat = 1 - 2 * p;
    const z = cephes.incbi(0.5, 0.5 * this._df, Math.abs(phat));
    const t = Math.sqrt(this._df * z / (1 - z));
    return (p < 0.5) ? -t : t;
  } else {
    const phat = (p >= 0.5) ? 1 - p : p;
    const z = cephes.incbi(0.5 * this._df, 0.5, 2 * phat);
    const t = Math.sqrt(this._df / z - this._df);
    return (p < 0.5) ? -t : t;
  }
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
