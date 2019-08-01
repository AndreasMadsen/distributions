# This script generates a JSON file with various values of Student's t-distribution.
# The results will be compared with the one's obtained with the JavaScript implementation.

dfs <- c(1, 2, 5, 10, 50)
ts <- c(-10, -5, -2, -1, -0.5, 0, 0.5, 1, 2, 5, 10)

result <- '[\n'

for (df in dfs) {
  for (t in ts) {
    cdf <- pt(t, df)
    result <- paste(result, '  { "df": ', df, ', "t": ', t, ', "cdf": ', sprintf("%.16f", cdf), ' },\n', sep='')
  }
}

result <- paste(substring(result, 1, nchar(result) - 2), '\n]', sep='')
write(result, file='studentt-cdf.json')
