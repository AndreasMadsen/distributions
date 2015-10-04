var mathfn = require('mathfn');

function ParetoDistribution(alpha, xm) {
  if(!(this instanceof ParetoDistribution)) {
    return new ParetoDistribution(alpha, xm);
  }

  if (typeof alpha !== 'number')  throw TypeError("alpha must be a number");
  if (typeof xm  !== 'number')    throw TypeError("xm must be a number, not ", (typeof xm));
  if (alpha <= 0.0)               throw TypeError("alpha must be positive");
  if (xm  <= 0.0)               throw TypeError("xm must be positive");
  
  // Input parameters
  this._alpha = alpha;
  this._xm  = xm;
};

exports.ParetoDistribution = ParetoDistribution;

ParetoDistribution.prototype.pdf = function(x) {
  if (x < this._xm) {
    throw TypeError("x must be greater than x_m.");
  }

  return ((this._alpha * Math.pow(this._xm, this._alpha)) / Math.pow(x, (this._alpha + 1)));
}

ParetoDistribution.prototype.cdf = function(x) {
  if (x < this._xm) {
    throw TypeError("x must be greater than x_m.");
  }
  return (1 - Math.pow((this._xm / x), this._alpha));
};

ParetoDistribution.prototype.inv = function(p) {
  if (p < 0 || p >= 1) {
    throw TypeError("p must fall within the range [0, 1)");
  }

  return this._xm / (Math.pow((1 - p), (1/this._alpha)));
};

ParetoDistribution.prototype.median = function() {
  var log2BaseAlpha = Math.log(2) / Math.log(this._alpha);
  return (this._xm * log2BaseAlpha);
};

ParetoDistribution.prototype.mean = function() {
  if(this._alpha <= 1) {
    return Number.POSITIVE_INFINITY;
  } else {
    return (this._alpha * this._xm) / (this._alpha - 1);
  }
};

ParetoDistribution.prototype.variance = function() {
  if(this._alpha < 1 && this._alpha <= 2) {
    return Number.POSITIVE_INFINITY;
  }

  var num   = Math.pow(this._xm, 2) * this._alpha;
  var denom = Math.pow(this._alpha-1, 2) * (this._alpha - 2);
  return (num/denom);
};
