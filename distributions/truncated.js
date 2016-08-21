function TruncatedDistribution(min, max, dist) {
  if(!(this instanceof TruncatedDistribution)) {
    return new TruncatedDistribution(min, max, dist);
  }

  // Input parameters
  this._dist    = dist;
  this._min     = min || Number.MIN_VALUE;
  this._max     = max || Number.MAX_VALUE;
};

exports.TruncatedDistribution = TruncatedDistribution;

TruncatedDistribution.prototype.pdf = function(x) {
  if(x <= this._min) return 0;
  if(x >  this._max) return 0;

  var a       = this._min,
      b       = this._max,
      pdf_x   = this._dist.pdf(x),
      cdf_a   = this._dist.cdf(a),
      cdf_b   = this._dist.cdf(b);

  return (pdf_x / (cdf_b - cdf_a));
}

TruncatedDistribution.prototype.cdf = function(x) {
  if(x <= this._min) return 0;
  if(x >  this._max) return 1;

  var a       = this._min,
      b       = this._max,
      cdf_x   = this._dist.cdf(x),
      cdf_a   = this._dist.cdf(a),
      cdf_b   = this._dist.cdf(b);

  return ((cdf_x - cdf_a) / (cdf_b - cdf_a));
};
