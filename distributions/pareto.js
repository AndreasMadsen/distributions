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
  return ((this._alpha * Math.pow(this._xm, this._alpha)) / Math.pow(x, (this._alpha + 1)));
}

ParetoDistribution.prototype.cdf = function(x) {
  return (1 - Math.pow((xm / x), this._alpha));
};

ParetoDistribution.prototype.mean = function() {
  if(this._alpha <= 1) 
    return Number.POSITIVE_INFINITY;
  else 
    return (this._alpha * this._xm) / (this._alpha - 1);
};
